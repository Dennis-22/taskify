export default function Tag({tag}) {
  return <p className={
      `w-fit px-2 rounded-full shadow-sm text-sm
      ${tag === "family" ? "bg-skin-green" : tag === "personal" ? "bg-skin-blue" : tag === "work" ? "bg-skin-red" : "bg-skin-yellow"}
      `
    }>
    <span className={`
      ${tag === "family" ? "text-skin-green" : tag === "personal" ? "text-skin-blue" : tag === "work" ? "text-skin-red" : "text-skin-yellow"}
      `
    }>
      {tag}
    </span>
  </p>
}
