import { Clock, MapPin, Navigation, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionTitle } from "@/components/SectionTitle";

const deliveryItems = [
  {
    icon: Truck,
    title: "Доставка по Костанаю",
    text: `Среднее время доставки ${siteConfig.deliveryTime}`
  },
  {
    icon: Clock,
    title: "Удобный интервал",
    text: "Можно выбрать желаемое окно доставки"
  },
  {
    icon: Navigation,
    title: "Курьером",
    text: `Стоимость доставки ${siteConfig.deliveryPriceFrom}`
  },
  {
    icon: MapPin,
    title: "Самовывоз",
    text: siteConfig.address
  }
];

export function DeliverySection() {
  return (
    <section className="bg-warmMilk py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionTitle
            eyebrow="доставка и самовывоз"
            title="Доставим букет сегодня или подготовим к самовывозу"
            description="Флорист пришлёт фото перед доставкой, а курьер аккуратно передаст букет получателю."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {deliveryItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-full bg-lightPink text-deepRose">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold text-graphite">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-softGraphite">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-premium">
          <div className="relative h-80 bg-warmMilk">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,38,43,0.08)_1px,transparent_1px),linear-gradient(rgba(37,38,43,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute left-0 top-16 h-5 w-full rotate-[-8deg] bg-goldBeige/25" />
            <div className="absolute bottom-20 left-0 h-5 w-full rotate-[12deg] bg-leafGreen/15" />
            <div className="absolute left-20 top-0 h-full w-5 rotate-[22deg] bg-primary/10" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[28px] bg-white p-6 text-center shadow-premium">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary text-white">
                <MapPin className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-4 text-lg font-semibold text-graphite">
                {siteConfig.brandName}
              </p>
              <p className="mt-1 text-sm text-softGraphite">
                {siteConfig.city}, {siteConfig.address}
              </p>
            </div>
          </div>
          <div className="border-t border-graphite/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-softGraphite/55">
              адрес склада
            </p>
            <p className="mt-2 text-2xl font-semibold text-graphite">
              {siteConfig.address}
            </p>
            <p className="mt-2 text-sm leading-6 text-softGraphite">
              Напишите заранее, если планируете самовывоз: флорист подготовит букет к вашему приезду.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
