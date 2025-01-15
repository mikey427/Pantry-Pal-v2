export const validateHouseholdId = (householdId: number): boolean => {
  if (!householdId) {
    return false;
  } else if (isNaN(Number(householdId))) {
    return false;
  }
  return true;
};
