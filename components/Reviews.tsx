import { Star } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

const reviews = [
  {
    name: "Алия",
    text: "Букет собрали быстро, перед доставкой прислали фото. Получатель был очень доволен."
  },
  {
    name: "Руслан",
    text: "Попросил уложиться в бюджет и сделать без лишней пестроты. Флорист предложил хороший вариант."
  },
  {
    name: "Марина",
    text: "Заказывала маме утром, доставили в тот же день. Цветы выглядели свежими и аккуратными."
  },
  {
    name: "Дина",
    text: "Удобно, что можно всё согласовать в WhatsApp: букет, открытку, время и адрес."
  },
  {
    name: "Нурлан",
    text: "Нужен был букет срочно. Подобрали из наличия и отправили курьером без долгих переписок."
  },
  {
    name: "Екатерина",
    text: "Композиция в коробке выглядела дороже своей цены. Хороший сервис для подарка."
  }
];

export function Reviews() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <SectionTitle
          eyebrow="социальное доказательство"
          title="Отзывы, которые легко заменить на реальные из 2GIS, Yandex или Instagram"
          description="Примеры отзывов клиентов / заменить на реальные после подключения источника."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-[28px] border border-graphite/10 bg-warmMilk p-6">
              <div className="flex gap-1 text-goldBeige" aria-label="5 из 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-graphite">“{review.text}”</p>
              <p className="mt-5 text-sm font-semibold text-softGraphite">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
