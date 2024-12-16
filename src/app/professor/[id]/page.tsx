"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import HeaderLogado from "@/app/components/HeaderLogado";
import { jwtDecode } from "jwt-decode";

interface Evaluation {
  id: string;
  subjectId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  user?: User;
  teacher?: Teacher;
  comments?: Comment[];
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Teacher {
  id: string;
  name: string;
  subjects: Subject[];
  evaluations: Evaluation[];
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  userId: string;
  avaliacaoId: string;
  conteudo: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export default function TeacherProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [content, setContent] = useState("");

  // Comment modal state
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState("");
  const [commentContent, setCommentContent] = useState("");

  // Fetch teacher data
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Verifique o valor do token no console

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded: { sub?: string } = jwtDecode(token);
    setUserId(decoded.sub || null);

    if (id) {
      axios
        .get(`http://localhost:3001/teacher/${id}`)
        .then(async (response) => {
          const teacherData: Teacher = response.data;
          console.log("Teacher data:", teacherData);

          // Fetch user details for each evaluation
          const evaluationsWithUserDetails = await Promise.all(
            teacherData.evaluations.map(async (evaluation) => {
              console.log("Fetching user for evaluation:", evaluation.id);
              const userResponse = await axios.get(
                `http://localhost:3001/users/${evaluation.UserId}`
              );
              console.log("User data for evaluation:", userResponse.data);

              // Fetch comments for each evaluation
              const commentsResponse = await axios.get(
                `http://localhost:3001/comentarios`
              );
              console.log("Comments response:", commentsResponse.data);

              const comments = commentsResponse.data.filter(
                (comment: Comment) => comment.avaliacaoId === evaluation.id
              );
              console.log("Filtered comments for evaluation:", comments);

              // Fetch user details for each comment
              const commentsWithUserDetails = await Promise.all(
                comments.map(async (comment: Comment) => {
                  console.log("Fetching user for comment:", comment.id);
                  const commentUserResponse = await axios.get(
                    `http://localhost:3001/users/${comment.userId}`
                  );
                  console.log("User data for comment:", commentUserResponse.data);
                  return { ...comment, user: commentUserResponse.data };
                })
              );

              return { ...evaluation, user: userResponse.data, comments: commentsWithUserDetails };
            })
          );

          console.log("Evaluations with user details:", evaluationsWithUserDetails);
          setTeacher({ ...teacherData, evaluations: evaluationsWithUserDetails });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching teacher data:", error);
          setLoading(false);
        });
    }
  }, [id, router]);

  // Fetch subjects data
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subjects');
        console.log("Subjects data:", response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleCreateEvaluation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const decoded = jwtDecode(token);
      console.log("Token recuperado:", token);
      console.log("Selected Subject ID:", selectedSubjectId);
      console.log("Evaluation Content:", content);
      console.log("Decoded User ID:", decoded.sub);
      await axios.post(
        "http://localhost:3001/evaluate",
        { subjectId: selectedSubjectId, content, teacherId: id, UserId: decoded.sub },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Avaliação criada com sucesso!");
      alert("Avaliação criada com sucesso!");
      setModalOpen(false);
      setSelectedSubjectId("");
      setContent("");
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
      alert("Erro ao criar avaliação");
    }
  };

  const handleCreateComment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const decoded = jwtDecode(token);
      console.log("Token recuperado:", token);
      console.log("Selected Evaluation ID:", selectedEvaluationId);
      console.log("Comment Content:", commentContent);
      console.log("Decoded User ID:", decoded.sub);
      await axios.post(
        "http://localhost:3001/comentarios",
        { avaliacaoId: selectedEvaluationId, conteudo: commentContent, userId: decoded.sub },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Comentário criado com sucesso!");
      alert("Comentário criado com sucesso!");
      setCommentModalOpen(false);
      setSelectedEvaluationId("");
      setCommentContent("");
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      alert("Erro ao criar comentário");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/comentarios/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTeacher((prevTeacher) =>
        prevTeacher
          ? {
              ...prevTeacher,
              evaluations: prevTeacher.evaluations.map((evaluation) => ({
                ...evaluation,
                comments: evaluation.comments?.filter(
                  (comment) => comment.id !== commentId
                ),
              })),
            }
          : null
      );

      alert("Comentário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o comentário:", error);
      alert("Erro ao excluir o comentário.");
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(subject => subject.id === subjectId);
    return subject ? subject.name : "Disciplina não encontrada";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderLogado />
      <div className="flex justify-center items-start pt-24">
        <main className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{teacher.name}</h2>
              <p className="text-gray-600">
                {teacher.subjects && teacher.subjects.length > 0 ? teacher.subjects.map(subject => subject.name).join(", ") : "Sem disciplinas"}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Nova Avaliação
            </button>
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Publicações</h3>
            <div className="mt-4 space-y-4">
              {teacher.evaluations.length > 0 ? (
                teacher.evaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="bg-green-100 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        <strong>{evaluation.user?.name}</strong> · {new Date(evaluation.createdAt).toLocaleString()} · {teacher.name} · {getSubjectName(evaluation.subjectId)}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-700">{evaluation.content}</p>
                    <button
                      onClick={() => {
                        setSelectedEvaluationId(evaluation.id);
                        setCommentModalOpen(true);
                      }}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Comentar
                    </button>
                    <div className="mt-4 space-y-2">
                      {evaluation.comments && evaluation.comments.length > 0 ? (
                        evaluation.comments
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((comment) => (
                            <div key={comment.id} className="bg-white p-2 rounded-md shadow-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">{comment.user?.name}</span>
                                <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
                                {comment.userId === userId && (
                                  <button
                                    className="px-2 py-1 bg-red-300 rounded-lg shadow-md hover:bg-red-400"
                                    onClick={() => handleDeleteComment(comment.id)}
                                  >
                                    Excluir
                                  </button>
                                )}
                              </div>
                              <p className="text-gray-700">{comment.conteudo}</p>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-600">Nenhum comentário disponível.</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Nenhuma avaliação disponível.</p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Modal para criar avaliação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-green-200 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Nova Avaliação</h2>
            <div className="space-y-4">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Selecione uma disciplina</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Conteúdo da avaliação"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={5}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateEvaluation}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para criar comentário */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-green-200 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Novo Comentário</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Conteúdo do comentário"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={5}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setCommentModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateComment}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}