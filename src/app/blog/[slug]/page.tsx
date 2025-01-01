

import { Articles } from "@/app/components/Articles";
import CommentSection from "@/app/components/Comment";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";


interface BlogPageProps {
  params: Promise<{ slug: string }>; // Updated to reflect that params is a Promise
}

// Generate static params for all articles
export async function generateStaticParams() {
  return Articles.map((article) => ({
    slug: article.slug,
  }));
}

// Blog Page component
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params; // Await the resolution of params

  // Find the article based on the slug
  const article = Articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <Header/>
    <div className="p-6 m-10">
      
      {/* Article Image */}
      <div className="flex justify-center items-center">
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={400}
          className="w-full h-96 object-fill mb-6 rounded-t-lg"
        />
      </div>

      {/* Article Metadata */}
      <div>
        
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="mt-3 text-lg">{article.discription}</p>
      </div>

      {/* Subheadings and Content */}
      <div>
        <h2 className="text-2xl font-serif mt-6">{article.heading}</h2>
        <p className="text-lg mb-4 mt-4">{article.content}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="mb-4 text-lg"
      />
      <div>
        <h2 className="font-serif text-2xl mb-2">{article.subHeading}</h2>
        <p className="text-lg">{article.details}</p>
      </div>

      {/* Comment Section */}
      <CommentSection />
      
    </div>
    <Footer/>
    </div>
  );
}