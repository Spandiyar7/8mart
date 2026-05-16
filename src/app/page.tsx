import { Hero } from "@/components/hero/Hero";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Bestsellers } from "@/components/home/Bestsellers";
import { BudgetPicker } from "@/components/home/BudgetPicker";
import { WhyUs } from "@/components/home/WhyUs";
import { OrderFlowMockup } from "@/components/mockups/OrderFlowMockup";
import { HowToOrder } from "@/components/home/HowToOrder";
import { DeliveryPreview } from "@/components/home/DeliveryPreview";
import { Reviews } from "@/components/home/Reviews";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <Bestsellers />
      <ScrollMarquee
        items={[
          "Свежие цветы каждый день",
          "Доставка 1,5–3 часа",
          "Фото перед доставкой",
          "Работаем 24/7",
          "500+ видов цветов",
          "Заказ через WhatsApp",
        ]}
      />
      <BudgetPicker />
      <WhyUs />
      <OrderFlowMockup />
      <HowToOrder />
      <DeliveryPreview />
      <Reviews />
      <InstagramGrid />
      <FinalCTA />
    </main>
  );
}
