import Container from "@/components/ui/Container";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";

type PageHeroProps = {
  crumbs: Crumb[];
  title: string;
  lede: string;
};

export default function PageHero({ crumbs, title, lede }: PageHeroProps) {
  return (
    <div className="bg-petrol pt-[118px] pb-[clamp(48px,7vw,88px)] text-white">
      <Container>
        <Breadcrumb items={crumbs} />
        <h1 className="mt-7 max-w-[18ch] text-[clamp(36px,5.6vw,72px)]">{title}</h1>
        <p className="mt-6 max-w-[58ch] text-[clamp(16px,1.5vw,19px)] text-[#b8c6cf]">{lede}</p>
      </Container>
    </div>
  );
}
