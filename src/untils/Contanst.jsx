import { FaImage } from "react-icons/fa";
import { GiGlowingHands } from "react-icons/gi";
import { MdCast } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";

export const listMenu = [
    {
        id: 1,
        name: 'Media Management',
        icon: <FaImage />,
        items: [
            {
                title: 'Movies',
                path: "/movies"
            },
            {
                title: 'Episodes',
                path: "/episodes",
            },
            {
                title: 'Sections',
                path: "/sections",
            }
        ]

    },
    {
        id: 2,
        name: 'Vip',
        icon: <RiVipCrownFill />,
        items: [
            {
                title: 'Packages',
                path: "/packages",
            },
            {
                title: 'Features',
                path: "/features",
            },
            {
                title: 'Plans',
                path: "/plans",
            }
        ]


    },
    {
        id: 3,
        name: 'MetaData',
        icon: <GiGlowingHands />,
        items: [
            {
                title: 'Categories',
                path: "/categories",
            },
            {
                title: 'Movies_Type',
                 path: "/movies_type",
            },
            {
                title: 'Countries',
                path : "/countries",
            }
        ]
    },
    {
        id: 4,
        name: 'Cast & Crew',
        icon: <MdCast />,
        items: [
            {
                title: 'Authors',
                path :"/authors", 
            },
            {
                title: 'Characters',
                path: "/chacracters",
            },
            {
                title: 'Actors',
                path: "/actors",
            }
        ]
    }

]

// Constants for roles
export const ROLES = {
  ADMIN: 'admin',        // Quản trị viên cấp cao
  MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
  USER: 'user',          // Người dùng thông thường
};

export const cloud_name = "dkgjqpkao" ;
export const upload_preset = "qfilm3" ;