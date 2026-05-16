import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BloomGlyph } from "@/components/ui/ProductMedia";

export default function NotFound() {
  return (
    <main className="grid min-h-[82svh] place-items-center px-5 pt-28">
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-6 h-44 w-44">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-light-pink to-primary" />
          <BloomGlyph
            rotation={20}
            className="absolute left-1/2 top-1/2 w-[94%] -translate-x-1/2 -translate-y-1/2 opacity-80"
          />
          <div className="noise absolute inset-0 rounded-full" />
        </div>

        <p className="font-display text-6xl text-gradient">404</p>
        <h1 className="mt-2 font-display text-2xl text-graphite sm:text-3xl">
          Такой страницы нет
        </h1>
        <p className="mt-2 max-w-sm text-soft-graphite">
          Но букеты на месте — вернитесь на главную или загляните в каталог.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            На главную
          </Button>
          <Button href="/catalog" variant="ghost">
            Открыть каталог
          </Button>
          <WhatsAppButton label="Написать в WhatsApp" />
        </div>
      </div>
    </main>
  );
}
