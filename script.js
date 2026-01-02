function calculate() {
  const transit = parseFloat(document.getElementById("costT").value) || 0;
  const parking = parseFloat(document.getElementById("costP").value) || 0;

  const selectedDays = getSelectedWeekdays();
  if (!selectedDays || selectedDays.length === 0) {
    document.getElementById("output").textContent = "Please select at least one weekday.";
    document.getElementById("output2").textContent = "";
    document.getElementById("output3").textContent = "";
    return;
  }

  const { year: targetYear, month: targetMonth } = getTargetMonthAndYear();
  const nextMonthDays = countWeekdaysInMonth(targetYear, targetMonth, selectedDays);

  // For a simpler, correct calculation: elect the full next-month cost (days * per-day cost)
  const transitElect = nextMonthDays * transit;
  const parkingElect = nextMonthDays * parking;

  const monthName = new Date(targetYear, targetMonth).toLocaleString("default", { month: "long" });

  document.getElementById("output").textContent = `Selected weekdays in ${monthName}: ${nextMonthDays}`;
  document.getElementById("output2").textContent = "Elect for Transit: $" + transitElect.toFixed(2);
  document.getElementById("output3").textContent = "Elect for Parking: $" + parkingElect.toFixed(2);
  }
  function showElectionMonth() {
  const { year, month } = getTargetMonthAndYear();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  document.getElementById("monthTitle").textContent = `Election Month: ${monthName} ${year}`;
  }
  function getTargetMonthAndYear() {
  const today = new Date();
  // Default to next month, but if today is on/after the 11th use the month after next
  const offset = today.getDate() >= 11 ? 2 : 1;
  const target = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  return { year: target.getFullYear(), month: target.getMonth() };
  }
  
  function getSelectedWeekdays() {
  return Array.from(document.querySelectorAll('input[name="days"]:checked')).map((cb) => parseInt(cb.value));
  }
  
  function countWeekdaysInMonth(year, month, selectedDays, startDay = 1) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let count = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    if (selectedDays.includes(date.getDay())) count++;
  }
  return count;
  }
  