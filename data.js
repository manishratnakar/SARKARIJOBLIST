const jobsData = [
    {
        id: 1,
        title: "Senior 3D Engineer",
        company: "MetaVerse Solutions",
        location: "Remote",
        type: "Full-time",
        tags: ["Three.js", "React", "WebGL"],
        salary: "$140k - $180k"
    },
    {
        id: 2,
        title: "Product Designer",
        company: "Luster Studio",
        location: "San Francisco, CA",
        type: "Full-time",
        tags: ["Figma", "UI/UX", "3D Design"],
        salary: "$120k - $160k"
    },
    {
        id: 3,
        title: "Backend Architect",
        company: "Global Scale",
        location: "London, UK",
        type: "Contract",
        tags: ["Node.js", "AWS", "Go"],
        salary: "$90/hr"
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "Creative Cloud",
        location: "New York, NY",
        type: "Full-time",
        tags: ["Vue.js", "GSAP", "Tailwind"],
        salary: "$110k - $150k"
    },
    {
        id: 5,
        title: "AI Research Scientist",
        company: "Neural Pulse",
        location: "Remote",
        type: "Full-time",
        tags: ["Python", "PyTorch", "NLP"],
        salary: "$160k - $220k"
    },
    {
        id: 6,
        title: "Technical Artist",
        company: "Pixel Perfect",
        location: "Austin, TX",
        type: "Full-time",
        tags: ["Unreal Engine", "Shaders", "C++"],
        salary: "$130k - $170k"
    }
];

function getJobs() {
    const savedJobs = localStorage.getItem('sarkarijoblist_jobs');
    if (savedJobs) {
        return JSON.parse(savedJobs);
    }
    localStorage.setItem('sarkarijoblist_jobs', JSON.stringify(jobsData));
    return jobsData;
}

function saveJobs(jobs) {
    localStorage.setItem('sarkarijoblist_jobs', JSON.stringify(jobs));
}

window.Sarkarijoblist = {
    getJobs,
    saveJobs
};

