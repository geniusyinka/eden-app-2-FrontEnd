import { Maybe, Project, ProjectMemberType } from "@graphql/eden/generated";
import { ProjectCard } from "ui";

export interface ProjectListProps {
  projects?: Project[] | Maybe<ProjectMemberType>[];
  applyButton?: boolean;
  favButton?: boolean;
  favouriteProjects?: Maybe<ProjectMemberType>[];
  updateFavoriteCallback?: Function;
}

export const ProjectList = ({
  projects,
  applyButton,
  favButton,
  favouriteProjects,
  updateFavoriteCallback,
}: ProjectListProps) => {
  const projectType = (project: any) => {
    if (project.__typename === "Project") {
      return project;
    } else if (project.__typename === "projectMemberType") {
      return project.info;
    } else {
      return project?.projectData;
    }
  };

  return (
    <div>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCard
              project={projectType(project)}
              avatar={project?.avatar || ""}
              percentage={
                project.__typename === "projectMatchType"
                  ? project.matchPercentage
                  : null
              }
              position={project?.position || ""}
              applyButton={applyButton}
              favButton={favButton}
              favorite={
                project.favorite ||
                favouriteProjects?.find(
                  (favProj: ProjectMemberType | null) =>
                    favProj?.info?._id === project._id
                )
              }
              updateFavoriteCallback={updateFavoriteCallback}
            />
          </div>
        ))}
    </div>
  );
};
