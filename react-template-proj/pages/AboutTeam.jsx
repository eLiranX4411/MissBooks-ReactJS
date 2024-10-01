const { useParams, useNavigate, Link } = ReactRouterDOM

export function AboutTeam() {
  const navigate = useNavigate()

  function onBack() {
    navigate(`/about`)
  }

  return (
    <section className='about-team-container'>
      <h1>Teammmmmmmmmmmmmm</h1>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
