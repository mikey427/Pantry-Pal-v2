export const validateHouseholdId = (householdId: string): boolean => {
  if (!householdId) {
    return false;
  } else if (isNaN(Number(householdId))) {
    return false;
  }
  return true;
};
