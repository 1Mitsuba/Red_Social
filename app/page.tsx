export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Red Social Univalle</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Plataforma universitaria para estudiantes</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Módulo Académico</h3>
              <p className="text-gray-600 dark:text-gray-400">Gestiona tu horario y actividades académicas</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Carpooling</h3>
              <p className="text-gray-600 dark:text-gray-400">Comparte viajes con otros estudiantes</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Red Social</h3>
              <p className="text-gray-600 dark:text-gray-400">Conecta con la comunidad universitaria</p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-300 font-medium">
              ✅ Proyecto sincronizado con GitHub en la rama "Copia"
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              Backend: FastAPI | Frontend: React Native Web | Preview: Next.js
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
