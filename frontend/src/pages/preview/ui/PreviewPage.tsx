import { Header } from "../../../widgets/header.tsx";
import { Footer } from "../../../widgets/footer.tsx";

export function PreviewPage() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* контент для наглядности */}
      </main>
      <Footer />
    </div>
  )
}