import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA } from "@/components/SiteChrome";
import { WhySection } from "./index";
export const Route = createFileRoute("/why-trident")({ head: () => ({ meta: [{title:"Why Trident | Local, Accountable Infrastructure Care"},{name:"description",content:"Why South African businesses choose Trident Cloud Services: local context, real human support and accountable operations."},{property:"og:title",content:"Why Trident Cloud Services"},{property:"og:description",content:"South African context, real humans and clear accountability."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}] }), component: WhyTrident });
function WhyTrident() { return <main><PageIntro eyebrow="WHY TRIDENT" title="A partner who takes ownership." description="A capable technical team, clear accountability and a practical understanding of the businesses we serve."/><WhySection/><FinalCTA/></main> }
