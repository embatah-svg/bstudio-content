import Link from "next/link";
import Container from "@/components/ui/Container";

// Pagina 404 per le sei lingue: il testo è volutamente minimo e bilingue
// perché qui la lingua della richiesta non è disponibile.
export default function NotFound() {
  return (
    <div className="bg-petrol pt-[118px] pb-[clamp(64px,9vw,120px)] text-white">
      <Container>
        <div className="font-heading text-[15px] font-bold text-steel">404</div>
        <h1 className="mt-4 max-w-[18ch] text-[clamp(36px,5.6vw,72px)]">Pagina non trovata.</h1>
        <p className="mt-6 max-w-[58ch] text-[clamp(16px,1.5vw,19px)] text-[#b8c6cf]">
          La pagina che cercate non esiste o è stata spostata. / The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-transparent bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] no-underline hover:bg-[#ffc91f]"
        >
          A.M.I. — Home
        </Link>
      </Container>
    </div>
  );
}
