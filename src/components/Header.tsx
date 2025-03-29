export default function Header() {
    return (
        <header className="text-center py-8">
            <h1 className="text-4xl font-bold tracking-widest text-amber-300 relative inline-block">
                <span className="relative z-10">MODERN ENIGMA</span>
                <div className="absolute inset-0 bg-zinc-800/50 blur-sm transform -skew-y-1 z-0"></div>
            </h1>
            <div className="mt-2 text-amber-200/70 tracking-wide">CIPHER MACHINE</div>
        </header>
    );
}