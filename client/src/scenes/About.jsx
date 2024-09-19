import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { Header } from "../components/Header";

const team = [
  {
    username: "Michael C Iyke",
    role: "Frontend",
    image: "https://avatars.githubusercontent.com/u/12535275?v=4",
    linkedin: "https://linkedin.com/in/michaeliyke",
    github: "https://github.com/michaeliyke",
    twitter: "https://twitter.com/michaelciyke",
  },
  {
    username: "Cyril Ugwuoke",
    role: "Backend",
    image: "https://avatars.githubusercontent.com/u/138785605?v=4",
    linkedin: "https://www.linkedin.com/in/iamzoba/",
    github: "https://github.com/chicyril",
    twitter: "https://x.com/_chi_zobam",
  },
  {
    username: "Radouane Abounouas",
    role: "Fullstack",
    image: "https://avatars.githubusercontent.com/u/137453952?v=4",
    linkedin: "https://linkedin.com/in/radouane-abounouas",
    github: "https://github.com/RadouaneAbn",
    twitter: "https://x.com/XRadouaneAbn",
  },
];

export const About = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className=" w-[80%] md:w-[90%] lg:w-[100%] min-h-screen  mx-auto h-auto p-5">
        <h1 className="text-center my-10 font-poppins text-2xl font-bold">
          Meet our teem
        </h1>
        <ul className="flex flex-row gap-5 flex-wrap justify-center text-white">
          {team.map((user, index) => (
            <li
              key={index}
              className="w-full bg-[#3C4858] md:w-[300px] h-auto hover:scale-105 border-2
border-black rounded-xl hover:border-green-300 duration-300 overflow-hidden"
            >
              <div className="p-4 flex flex-col items-center justify-center">
                <img
                  src={user.image}
                  alt={user.username}
                  className="size-[200px] border-2 border-black rounded-full"
                />
                <span className="w-[90%] border-t border-black my-4"></span>
                <h2 className="text-center font-Teko font-medium text-4xl">
                  {user.username}
                </h2>
                <h4 className="text-lg font-poppins mb-2">{user.role}</h4>
                <div className="flex gap-4">
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn size={30} className="hover:text-blue-300" />
                  </a>
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={30} className="hover:text-black" />
                  </a>
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={30} className="hover:text-blue-500" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
