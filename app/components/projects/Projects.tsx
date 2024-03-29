import { ProjectsCarouselContextProvider } from "@/contexts/ProjectsCarouselContext";
import Carousel from "./Carousel";
import Project from "./Project";
import { db } from "@/drizzle/";
import { projects } from "@/drizzle/schema";

export default async function Projects() {
  try {
    const allProjects = await db.select().from(projects);

    if (allProjects.length != 0) {
      return (
        <ProjectsCarouselContextProvider>
          <Carousel className="flex w-screen max-w-112 flex-col overflow-hidden md:w-192 md:max-w-none lg:w-288 ">
            {allProjects.map((project) => (
              <Project projectId={project.id} />
            ))}
          </Carousel>
        </ProjectsCarouselContextProvider>
      );
    }
  } catch {}
}
