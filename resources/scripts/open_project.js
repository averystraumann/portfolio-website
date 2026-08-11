const projects = {
  YGGDROWSIL: {
    title: "YGGDROWSIL",
    description:
      " For the Ubisoft Gamelabs Competition, my team and I made a game prototype which included synchronous online multiplayer, artificial intelligence, and 10 minutes of gameplay. My contributions as a programmer included setting up the audio system, creating enemy attacks, making the interactable object system, the settings/menu screens, adding special abilities for the players, and using NetCode to sync the level and ability selection between the two players.",
    techstack: "Tech Used: Unity 3D, C#, Git",
    media: [{ type: "video", src: "resources/images/Yggdrowsil_Gameplay.mp4" }],
    link: "https://marcello-catalfamo.itch.io/yggdrowsil",
  },
  raytracer: {
    title: "Python Raytracer",
    description:
      "A from-scratch raytracer written in Python. Supports spheres, planes, meshes, etc, and includes features such as reflection, refraction, area lights, depth of field blur, environment mapping, and motion blur!",

    media: [
      { type: "image", src: "resources/images/raytracergalaxy.png" },
      { type: "image", src: "resources/images/BoxStacks.png" },
      { type: "image", src: "resources/images/ReflectiveSpheres.png" },
    ],
    // no link — this project just won't show a "View project" button
  },
  mesheditor: {
    title: "Mesh Editor",
    description:
      "Implemented a half edge data structure representation of a mesh, as well as edge operations such as flip, split, and erase, face operations including inset, extrude, and bevel, and triangulate which converts a polygon into a triangle to slot into the mesh.",
    media: [{ type: "video", src: "resources/images/mesh_demo.mp4" }],
    // no link — this project just won't show a "View project" button
  },
  fluidsim: {
    title: "Fluid Sim",
    description:
      "Implemented a stable Eulerian simulation using python and parallelized with warp. Features include temperature diffusion (with red = hot, blue = cold), buoyancy forces, velocity diffusion, and advecting particles.",
    media: [{ type: "video", src: "resources/images/fluidvid.mp4" }],
    // no link — this project just won't show a "View project" button
  },
};

const overlay = document.getElementById("projectModalOverlay");
const modalMedia = overlay.querySelector(".project-modal-media");
const modalTitle = overlay.querySelector(".project-modal-title");
const modalDesc = overlay.querySelector(".project-modal-desc");
const modalTechStack = overlay.querySelector(".project-modal-techstack");
const modalLink = overlay.querySelector(".project-modal-link");
const closeBtn = overlay.querySelector(".project-modal-close");

function openProject(id) {
  const project = projects[id];
  if (!project) return;

  modalMedia.innerHTML = "";
  (project.media || []).forEach((item) => {
    let el;
    if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src;
      el.controls = true;
    } else {
      el = document.createElement("img");
      el.src = item.src;
      el.alt = project.title;
    }
    el.className = "project-modal-media-item";
    modalMedia.appendChild(el);
  });

  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;
  modalTechStack.textContent = project.techstack || ""; // Set tech stack text or empty if not provided

  if (project.link) {
    modalLink.href = project.link;
    modalLink.style.display = "inline-block";
  } else {
    modalLink.style.display = "none";
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  modalMedia.innerHTML = ""; // stops any playing video audio once closed
}

document.querySelectorAll(".project-container").forEach((container) => {
  container.addEventListener("click", () => {
    openProject(container.dataset.project);
  });
});

closeBtn.addEventListener("click", closeProject);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeProject();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeProject();
  }
});
