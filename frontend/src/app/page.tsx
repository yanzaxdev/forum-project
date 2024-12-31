import { H1, P } from "~/components/Typography";
import { getLang } from "../utils/language";
import { cn } from "~/lib/utils";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: {
    lang?: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { translation, dir } = await getLang(searchParams);

  return (
    <main
      dir={dir}
      className={cn(
        "min-h-screen px-4 py-8",
        "flex flex-col items-center justify-center",
      )}
    >
      <H1 className="mb-4 text-center text-4xl font-bold">
        {translation.welcomeMessage}
      </H1>

      <P className="mb-6 max-w-md text-center text-lg">
        {translation.welcomeDescription}
      </P>
    </main>
  );
};

export default HomePage;
