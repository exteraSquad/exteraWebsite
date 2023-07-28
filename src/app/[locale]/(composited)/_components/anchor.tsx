export default function Anchor({id, className = "-top-24 md:-top-32"}: {id: string, className?: string}) {
    return <div id={id} className={`relative ${className}`} />
}