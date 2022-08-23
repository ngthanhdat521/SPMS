import React from "react";

function GradeRowsData() {
  return [
    {
      deliverable: "Software Engineering Practices (20%)",
      criteria:
        "Use of software engineering “good” practices from courses to create good quality product",
      shortName: "SEP",
    },
    {
      deliverable: "Ideas and proposed solutions (20%)",
      criteria:
        "Propose new ideas, new solutions or apply new trending technologies, project constraint consideration",
      shortName: "IPS",
    },
    {
      deliverable: "Software process (10%)",
      criteria:
        "Documentation, process improvement, time tracking, meeting management, web page/existence/ adherence to processes, software standards",
      shortName: "SP",
    },
    {
      deliverable: "Artifacts (20%)",
      criteria:
        "SRS/ PB, SOW, SPMP, Standards, Minutes, etc. Look at clarity, and usefulness. Also look for teams producing just for impressing mentors",
      shortName: "Artifacts",
    },
    {
      deliverable: "Teamwork and Communication (20%)",
      criteria:
        "Timeliness, attendance, teamwork, communication (spoken/written), professionalism (team first, ethics, positive attitude, proactive, self-starter, courteous), participation in studio roles",
      shortName: "Communication",
    },
    {
      deliverable: "Presentation (10%)",
      criteria:
        "Visual aids, overall organization, handling questions and lesson learned",
      shortName: "Presentation",
    },
  ];
}

export default GradeRowsData;
