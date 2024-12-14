"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import HeaderLogado from '@/app/components/HeaderLogado';

interface Evaluation {
  id: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  user?: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  evaluations: Evaluation[];
  createdAt: string;
  updatedAt: string;
}

export default function TeacherProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      console.log(id);
      axios.get(`http://localhost:3001/teacher/${id}`)
        .then(async response => {
          const teacherData: Teacher = response.data;

          // Fetch user details for each evaluation
          const evaluationsWithUserDetails = await Promise.all(
            teacherData.evaluations.map(async (evaluation) => {
              const userResponse = await axios.get(`http://localhost:3001/users/${evaluation.UserId}`);
              return { ...evaluation, user: userResponse.data };
            })
          );

          setTeacher({ ...teacherData, evaluations: evaluationsWithUserDetails });
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching teacher data:", error);
          setLoading(false);
        });
    }
  }, [id, router]);

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
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{teacher.name}</h2>
              <p className="text-gray-600">{teacher.subjects.join(", ")}</p>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Publicações</h3>
            <div className="mt-4 space-y-4">
              {/* Mapeando as avaliações dinamicamente */}
              {teacher.evaluations.length > 0 ? (
                teacher.evaluations.map(evaluation => (
                  <div key={evaluation.id} className="bg-green-100 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        {evaluation.subject} - {new Date(evaluation.createdAt).toLocaleString()}
                      </p>
                      <span className="text-gray-600">{evaluation.user?.name}</span>
                    </div>
                    <p className="mt-2 text-gray-700">
                      {evaluation.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-gray-600">
                      <p>2 comentários</p> {/* Atualize com o número real de comentários se disponível */}
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