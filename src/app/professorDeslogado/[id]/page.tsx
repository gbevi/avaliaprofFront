"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import HeaderDeslogado from "@/app/components/HeaderDeslogado";

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

export default function TeacherProfileDeslogado() {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Fetch teacher data
  useEffect(() => {
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
  }, [id]);

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
      <HeaderDeslogado />
      <div className="flex justify-center items-start pt-24">
        <main className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{teacher.name}</h2>
              <p className="text-gray-600">
                {teacher.subjects && teacher.subjects.length > 0 ? teacher.subjects.map(subject => subject.name).join(", ") : "Sem disciplinas"}
              </p>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Publicações</h3>
            <div className="mt-4 space-y-4">
              {teacher.evaluations.length > 0 ? (
                teacher.evaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="bg-green-100 p-4 rounded-lg shadow-md"
                    onClick={() => router.push(`/perfilDeslogado/${evaluation.user?.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        <strong>{evaluation.user?.name}</strong> · {new Date(evaluation.createdAt).toLocaleString()} · {teacher.name} · {getSubjectName(evaluation.subjectId)}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-700">{evaluation.content}</p>
                    <div className="mt-4 space-y-2">
                      {evaluation.comments && evaluation.comments.length > 0 ? (
                        evaluation.comments
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-white p-2 rounded-md shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/perfilDeslogado/${comment.user?.id}`);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">{comment.user?.name}</span>
                                <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
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
    </div>
  );
}