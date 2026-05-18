import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-warmMilk py-20">
      <div className="container-page text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-graphite">
          Страница не найдена
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-softGraphite">
          Возможно, букет уже убрали из демо-каталога. Откройте каталог или напишите флористу.
        </p>
        <Button asChild className="mt-8">
          <Link href="/catalog">Перейти в каталог</Link>
        </Button>
      </div>
    </section>
  );
}
