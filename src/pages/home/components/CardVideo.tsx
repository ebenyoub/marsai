// import { Play } from 'lucide-react'; // L'icône (OK)
// import { motion } from 'framer-motion';
// import Card from '@/components/ui/Card';


// interface VideoProps {
//   country: string;
//   thumbnail: string;
//   category: string;
// }

// export default function CardVideo({ country, thumbnail, category }: VideoProps) {
//   return (
//     <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
//       <Card className="overflow-hidden border-none p-0 bg-[#1A1A1A]">
//         <figure className="relative group">
//           {/* --- PARTIE HAUTE : IMAGE & BADGES --- */}
//           <div className="relative h-48 w-full overflow-hidden">
//             <img 
//               src={thumbnail} 
//               alt={country} 
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
//             />
//             {/* Overlay sombre */}
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

//             {/* Badge Gauche (Pays) */}
//             <Badge className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white border-none rounded-full px-3 py-1">
//               {country}
//             </Badge>

//             {/* Badge Droite (Sélection) */}
//             <Badge className="absolute top-3 right-3 bg-[#121212] text-[#8B5CF6] border border-primary/20 rounded-full px-3 py-1 font-semibold">
//               Sélection officielle
//             </Badge>

//             {/* Play Button au milieu */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-125">
//                 <Play className="text-white fill-white w-5 h-5 ml-1" />
//               </div>
//             </div>
//           </div>

//           {/* --- PARTIE BASSE : FIGCAPTION & TAGS --- */}
//           <figcaption className="p-4 bg-[#1A1A1A]">
//             <div className="flex flex-wrap gap-2 mt-2">
//               {/* Les 3 Badges du bas */}
//               {['Scénario', 'Image', 'Vidéo'].map((tag) => (
//                 <Badge 
//                   key={tag} 
//                   variant="outline" 
//                   className="bg-[#121212] text-white border-primary/50 text-[10px] uppercase tracking-wider px-2 py-0.5"
//                 >
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           </figcaption>
//         </figure>
//       </Card>
//     </motion.div>
//   );
// }