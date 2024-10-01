const { useParams, useNavigate, Link } = ReactRouterDOM

export function AboutGoal() {
  const navigate = useNavigate()

  function onBack() {
    navigate(`/about`)
  }

  return (
    <section className='about-goal-container'>
      <h1>Goalllllllllllll</h1>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
