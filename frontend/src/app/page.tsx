import { getLang } from "../utils/language";
import { cn } from "~/lib/utils";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: {
    lang?: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { translation } = await getLang(searchParams);

  return (
    <main
      dir={translation._dir}
      className={cn(
        "min-h-screen px-4 py-8",
        "flex flex-col items-center justify-center",
      )}
    >
      <h1 className="mb-4 text-4xl font-bold">{translation.welcomeMessage}</h1>

      <p className="mb-6 max-w-md text-center text-lg">
        {translation.welcomeDescription}
      </p>
    </main>
  );
};

export default HomePage;
