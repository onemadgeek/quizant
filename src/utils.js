export function secondsToHMS(secs) {
  function z(n) {
		let s = (n < 10 ? "0" : "") + n;
    return String(s).split('.')[0];
  }
  var sign = secs < 0 ? "-" : "";
  secs = Math.abs(secs);
  return (
    sign +
    z((secs / 3600) | 0) +
    ":" +
    z(((secs % 3600) / 60) | 0) +
    ":" +
    z(secs % 60)
  );
}
