"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HeaderLogado from "../components/HeaderLogado";
import EditProfileModal from "../components/EditProfileModal";
import DeleteProfileModal from "../components/DeleteProfileModal";

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
  photo: string;
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
  photo: string;
  avatar?: string;
  evaluations: Evaluation[];
}

export default function Perfil() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decoded: { sub?: string } = jwtDecode(token);
        const userId = decoded.sub;

        if (!userId) {
          throw new Error("ID do usuário (sub) não encontrado no token.");
        }

        // Busca os dados do perfil
        const profileResponse = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Busca as avaliações relacionadas ao usuário
        const evaluationsResponse = await axios.get(
          `http://localhost:3001/evaluate/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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

  const handleEditProfile = async (data: FormData) => {
  if (!profile) return;
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `http://localhost:3001/users/${profile.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Atualize o perfil local com os dados retornados do backend (incluindo a nova foto, se houver)
    setProfile((prevProfile) =>
      prevProfile
        ? {
            ...prevProfile,
            name: response.data.name,
            email: response.data.email,
            course: response.data.course,
            department: response.data.department,
            photo: response.data.photo, 
          }
        : null
    );

    alert("Perfil atualizado com sucesso!");
    setIsEditModalOpen(false);
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    alert("Erro ao atualizar o perfil.");
  }
};

  const handleDeleteProfile = async () => {
    if (!profile) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/users/${profile.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Perfil excluído com sucesso!");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao excluir o perfil:", error);
      alert("Erro ao excluir o perfil.");
    }
  };

  const handleDeleteEvaluation = async (evaluationId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/evaluate/${evaluationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile((prevProfile) =>
        prevProfile
          ? {
              ...prevProfile,
              evaluations: prevProfile.evaluations.filter(
                (evaluation) => evaluation.id !== evaluationId
              ),
            }
          : null
      );

      alert("Avaliação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a avaliação:", error);
      alert("Erro ao excluir a avaliação.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/comentarios/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile((prevProfile) =>
        prevProfile
          ? {
              ...prevProfile,
              evaluations: prevProfile.evaluations.map((evaluation) => ({
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
        <p>Erro ao carregar o perfil. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderLogado />
      <div className="flex justify-center items-start pt-24">
        <main className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div>
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-3xl mr-4 overflow-hidden">
                      {/* If you have a photo URL, replace the emoji below with an <img src={photoUrl} ... /> */}
                      {profile.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/jpeg;base64,${profile.photo}`}
              alt={profile.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-3xl">👤</span>
          )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.course} / {profile.department}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              className="px-4 py-2 bg-green-300 rounded-lg shadow-md hover:bg-green-400"
              onClick={() => setIsEditModalOpen(true)}
            >
              Editar Perfil
            </button>
            <button
              className="px-4 py-2 bg-red-300 rounded-lg shadow-md hover:bg-red-400"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Excluir Perfil
            </button>
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
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 bg-red-300 rounded-lg shadow-md hover:bg-red-400"
                            onClick={() => handleDeleteEvaluation(evaluation.id)}
                          >
                            Excluir
                          </button>
                        </div>
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
                                  {comment.userId === profile.id && (
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
                  );
                })
              ) : (
                <p className="text-gray-600">Nenhuma avaliação encontrada.</p>
              )}
            </div>
          </section>
        </main>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProfile}
        initialData={{
          name: profile.name,
          email: profile.email,
          course: profile.course,
          photo: profile.photo,
          department: profile.department,
        }}
      />

      <DeleteProfileModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteProfile}
      />
    </div>
  );
}