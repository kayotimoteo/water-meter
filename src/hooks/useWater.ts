import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

const WaterIntakeSchema = z.object({
	id: z.number(),
	amount: z.number(),
	timestamp: z.number(),
	date: z.string(),
});

type WaterIntake = z.infer<typeof WaterIntakeSchema>;

const STORAGE_KEY = "water-meter-records";
const GOAL_STORAGE_KEY = "water-meter-goal";
const QUICK_AMOUNTS_STORAGE_KEY = "water-meter-quick-amounts";

let idCounter = Date.now();

const DEFAULT_GOAL = 3000;
const DEFAULT_QUICK_AMOUNTS = [250, 500, 710, 1000];

function getTodayDate(): string {
	return dayjs().format("YYYY-MM-DD");
}

function loadFromStorage(): WaterIntake[] {
	if (typeof window === "undefined") {
		return [];
	}
	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) {
		return [];
	}
	try {
		return JSON.parse(data);
	} catch {
		return [];
	}
}

function saveToStorage(records: WaterIntake[]) {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function loadGoalFromStorage(): number {
	if (typeof window === "undefined") {
		return DEFAULT_GOAL;
	}
	const data = localStorage.getItem(GOAL_STORAGE_KEY);
	if (!data) {
		return DEFAULT_GOAL;
	}
	try {
		const goal = Number.parseInt(data, 10);
		return Number.isNaN(goal) || goal <= 0 ? DEFAULT_GOAL : goal;
	} catch {
		return DEFAULT_GOAL;
	}
}

function saveGoalToStorage(goal: number) {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.setItem(GOAL_STORAGE_KEY, goal.toString());
}

function loadQuickAmountsFromStorage(): number[] {
	if (typeof window === "undefined") {
		return DEFAULT_QUICK_AMOUNTS;
	}
	const data = localStorage.getItem(QUICK_AMOUNTS_STORAGE_KEY);
	if (!data) {
		return DEFAULT_QUICK_AMOUNTS;
	}
	try {
		const amounts = JSON.parse(data);
		if (
			Array.isArray(amounts) &&
			amounts.every((a) => typeof a === "number" && a > 0)
		) {
			return amounts;
		}
		return DEFAULT_QUICK_AMOUNTS;
	} catch {
		return DEFAULT_QUICK_AMOUNTS;
	}
}

function saveQuickAmountsToStorage(amounts: number[]) {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.setItem(QUICK_AMOUNTS_STORAGE_KEY, JSON.stringify(amounts));
}

export function useWater() {
	const [records, setRecords] = useState<WaterIntake[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [goal, setGoal] = useState<number>(DEFAULT_GOAL);
	const [quickAmounts, setQuickAmounts] = useState<number[]>(
		DEFAULT_QUICK_AMOUNTS
	);

	useEffect(() => {
		setRecords(loadFromStorage());
		setGoal(loadGoalFromStorage());
		setQuickAmounts(loadQuickAmountsFromStorage());
		setIsLoaded(true);
	}, []);

	const todayDate = getTodayDate();

	const todayRecords = records.filter((r) => r.date === todayDate);

	const todayTotal = todayRecords.reduce((sum, r) => sum + r.amount, 0);

	const addWater = useCallback(
		(amount: number) => {
			if (amount <= 0) {
				return;
			}
			const newRecord: WaterIntake = {
				id: ++idCounter,
				amount,
				timestamp: Date.now(),
				date: todayDate,
			};
			setRecords((prev) => {
				const updated = [...prev, newRecord];
				saveToStorage(updated);
				return updated;
			});
		},
		[todayDate]
	);

	const deleteRecord = useCallback((id: number) => {
		setRecords((prev) => {
			const updated = prev.filter((r) => r.id !== id);
			saveToStorage(updated);
			return updated;
		});
	}, []);

	const getAllRecords = useCallback(() => {
		return records;
	}, [records]);

	const getTodayRecords = useCallback(() => {
		return todayRecords;
	}, [todayRecords]);

	const getTodayTotal = useCallback(() => {
		return todayTotal;
	}, [todayTotal]);

	const updateGoal = useCallback((newGoal: number) => {
		if (newGoal > 0) {
			setGoal(newGoal);
			saveGoalToStorage(newGoal);
		}
	}, []);

	const addQuickAmount = useCallback(
		(amount: number) => {
			if (amount > 0 && !quickAmounts.includes(amount)) {
				const updated = [...quickAmounts, amount].sort((a, b) => a - b);
				setQuickAmounts(updated);
				saveQuickAmountsToStorage(updated);
			}
		},
		[quickAmounts]
	);

	const removeQuickAmount = useCallback(
		(amount: number) => {
			const updated = quickAmounts.filter((a) => a !== amount);
			setQuickAmounts(updated);
			saveQuickAmountsToStorage(updated);
		},
		[quickAmounts]
	);

	return {
		addWater,
		deleteRecord,
		getAllRecords,
		getTodayRecords,
		getTodayTotal,
		todayRecords,
		todayTotal,
		isLoaded,
		goal,
		updateGoal,
		quickAmounts,
		addQuickAmount,
		removeQuickAmount,
	};
}
