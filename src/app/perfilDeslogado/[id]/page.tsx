"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import HeaderDeslogado from "@/app/components/HeaderDeslogado";

interface Evaluation {
  id: string;
  subjectId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  teacherId: string;
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

interface Profile {
  name: string;
  id: string;
  email: string;
  course: string;
  department: string;
  avatar?: string;
  evaluations: Evaluation[];
}

export default function PerfilDeslogado() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Busca os dados do perfil
        const profileResponse = await axios.get(
          `http://localhost:3001/users/${id}`
        );

        // Busca as avaliações relacionadas ao usuário
        const evaluationsResponse = await axios.get(
          `http://localhost:3001/evaluate/user/${id}`
        );

        // Busca os detalhes dos usuários, professores e comentários que fizeram as avaliações
        const evaluationsWithDetails = await Promise.all(
          evaluationsResponse.data.map(async (evaluation: Evaluation) => {
            const userResponse = await axios.get(
              `http://localhost:3001/users/${evaluation.UserId}`
            );
            const teacherResponse = await axios.get(
              `http://localhost:3001/teacher/${evaluation.teacherId}`
            );

            // Fetch comments for each evaluation
            const commentsResponse = await axios.get(
              `http://localhost:3001/comentarios`
            );

            const comments = commentsResponse.data.filter(
              (comment: Comment) => comment.avaliacaoId === evaluation.id
            );

            // Fetch user details for each comment
            const commentsWithUserDetails = await Promise.all(
              comments.map(async (comment: Comment) => {
                const commentUserResponse = await axios.get(
                  `http://localhost:3001/users/${comment.userId}`
                );
                return { ...comment, user: commentUserResponse.data };
              })
            );

            return { ...evaluation, user: userResponse.data, teacher: teacherResponse.data, comments: commentsWithUserDetails };
          })
        );

        setProfile({
          ...profileResponse.data,
          evaluations: evaluationsWithDetails,
        });
      } catch (error) {
        console.error("Erro ao carregar o perfil ou avaliações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Fetch subjects data
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
      }
    };

    fetchSubjects();
  }, []);

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((subject) => subject.id === subjectId);
    return subject ? subject.name : "Disciplina não encontrada";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p>Erro ao carregar o perfil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderDeslogado />
      <div className="flex justify-center items-start pt-24">
        <main className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.course} / {profile.department}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Avaliações</h3>
            <div className="mt-4 space-y-4">
              {profile.evaluations && profile.evaluations.length > 0 ? (
                profile.evaluations.map((evaluation) => {
                  console.log("Evaluation data:", evaluation); // Adiciona o console.log aqui
                  return (
                    <div key={evaluation.id} className="bg-green-100 p-4 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          <strong>{evaluation.user?.name}</strong> · {new Date(evaluation.createdAt).toLocaleString()} · {evaluation.teacher?.name} · {getSubjectName(evaluation.subjectId)}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-700">{evaluation.content}</p>
                      <div className="mt-4 space-y-2">
                        {evaluation.comments && evaluation.comments.length > 0 ? (
                          evaluation.comments
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((comment) => (
                              <div key={comment.id} className="bg-white p-2 rounded-md shadow-sm">
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
                  );
                })
              ) : (
                <p className="text-gray-600">Nenhuma avaliação encontrada.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}