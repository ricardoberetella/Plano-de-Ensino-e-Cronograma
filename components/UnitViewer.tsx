<UnitViewer
  unit={unitToShow}
  units={currentPlan.units || []}
  onSelectUnit={(unitId) => {
    const found = (currentPlan.units || []).find((u: any) => String(u.id) === String(unitId));
    if (found) setSelectedUnit(found);
  }}
  onUpdateSchedule={handleUpdateSchedule}
  onUpdateCalendar={handleUpdateCalendar}
/>
