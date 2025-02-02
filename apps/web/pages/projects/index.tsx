import { useQuery } from "@apollo/client";
import { FIND_PROJECTS, FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
import type { NextPage } from "next";
import { useContext } from "react";
import { GridItemSix, GridItemThree, GridLayout, TabsCard } from "ui";

import { UserContext } from "../../context";

// TODO: after getting user context in place, add findProjects_RecommendedToUser query

const tabs = [
  {
    title: "All projects",
    fullTitle: "All projects",
  },
  {
    title: "Favourites",
    fullTitle: "Favourites",
  },
  {
    title: "Recommended",
    fullTitle: "Recommended",
  },
];

const ProjectsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);
  const { data: dataProjectsAll } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  if (dataProjectsAll) console.log("dataProjectsAll", dataProjectsAll);

  const { data: dataProjectsRecommended } = useQuery(
    FIND_PROJECTS_RECOMMENDED,
    {
      variables: {
        fields: {
          memberID: currentUser?._id,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  if (dataProjectsRecommended)
    console.log("dataProjectsRecommended", dataProjectsRecommended);

  // TODO: need query to get user favourite projects

  return (
    <GridLayout>
      <GridItemThree>user profile</GridItemThree>
      <GridItemSix>
        <TabsCard tabs={tabs} onSelect={(val) => console.log(val)} />
      </GridItemSix>
      <GridItemThree>recommend</GridItemThree>
    </GridLayout>
  );
};

export default ProjectsPage;
