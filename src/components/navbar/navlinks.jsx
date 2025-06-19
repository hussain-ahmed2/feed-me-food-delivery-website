import Link from "next/link";

const links = [
	{ name: "Home", href: "/" },
	{ name: "Menu", href: "/#menu" },
	{ name: "Dishes", href: "/dishes" },
	{ name: "Contact Us", href: "#contact-us" },
];

export default function NavLinks({ isMenuOpen, closeMenu }) {
	return (
		<ul
			className={`fixed z-50 top-20 left-0 right-0 max-md:bg-white md:static flex flex-col md:items-center md:flex-row md:gap-8 max-md:border-b max-md:border-gray-200 transition transform duration-300 origin-right ${
				isMenuOpen ? "" : "max-md:scale-x-0"
			}`}
		>
			{links.map((link) => (
				<li onClick={closeMenu} key={link.name}>
					<Link className="nav-link" href={link.href}>
						{link.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
