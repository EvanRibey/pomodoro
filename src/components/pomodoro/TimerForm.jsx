export default function TimerForm(props) {
  const {
    submit,
    interval,
    setIntervalCycle,
    cycles,
    setCycles,
    flipped,
  } = props;

  return (
    <div className={`pomodoro-timer ${flipped ? 'form--flipped' : 'form'}`}>
      <h2 className="pomodoro-timer__title">Set Pomodoro Timer</h2>
      <form className="pomodoro-timer__form pomo-form" onSubmit={submit}>
        <label className="pomo-form__label" htmlFor="interval">
          Select Interval Type
        </label>
        <select
          onChange={({ target }) => setIntervalCycle(target.value)}
          value={interval}
          id="interval"
          className="pomo-form__select"
          required
        >
          <option value="">---</option>
          <option value="25">25/5</option>
          <option value="50">50/10</option>
        </select>
        <label className="pomo-form__label" htmlFor="cycles">
          Select Cycle Count
        </label>
        <input
          onChange={({ target }) => setCycles(+target.value)}
          value={cycles}
          className="pomo-form__input"
          id="cycles"
          type="number"
          min="1"
          required
        />
        <button className="pomo-form__button">Start Timer</button>
      </form>
    </div>
  );
}
