import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Droplets, History, Plus, Settings, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWater } from "@/hooks/use-water";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex min-h-screen items-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-2 sm:p-4">
			<div className="mx-auto w-full max-w-md">
				<header className="mb-4 flex items-center justify-between sm:mb-6">
					<div className="flex items-center gap-2 sm:gap-3">
						<div className="rounded-lg bg-cyan-500/20 p-1.5 sm:p-2">
							<Droplets className="h-6 w-6 text-cyan-400 sm:h-8 sm:w-8" />
						</div>
						<h1 className="font-bold text-white text-xl sm:text-2xl">
							Water Meter
						</h1>
					</div>
					<Link
						className="rounded-lg bg-slate-700/50 p-1.5 transition-colors hover:bg-slate-700 sm:p-2"
						to="/history"
					>
						<History className="h-5 w-5 text-gray-300 sm:h-6 sm:w-6" />
					</Link>
				</header>
				<WaterContent />
			</div>
		</div>
	);
}

function WaterContent() {
	const {
		addWater,
		deleteRecord,
		todayRecords,
		todayTotal,
		isLoaded,
		goal,
		updateGoal,
		quickAmounts,
		addQuickAmount,
		removeQuickAmount,
	} = useWater();
	const [customAmount, setCustomAmount] = useState("");
	const [goalDialogOpen, setGoalDialogOpen] = useState(false);
	const [newGoal, setNewGoal] = useState("");
	const [quickAmountDialogOpen, setQuickAmountDialogOpen] = useState(false);
	const [newQuickAmount, setNewQuickAmount] = useState("");

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="h-8 w-8 animate-spin rounded-full border-cyan-400 border-b-2" />
			</div>
		);
	}

	const handleAddWater = (amount: number) => {
		if (amount > 0) {
			addWater(amount);
			setCustomAmount(amount.toString());
		}
	};

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Remove qualquer caractere que não seja número
		const numericValue = value.replace(/\D/g, "");
		setCustomAmount(numericValue);
	};

	const handleCustomSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const amount = Number.parseInt(customAmount, 10);
		if (!Number.isNaN(amount) && amount > 0) {
			handleAddWater(amount);
		}
	};

	const formatTime = (timestamp: number) => {
		return dayjs(timestamp).locale("pt-br").format("HH:mm");
	};

	const recentRecords = [...todayRecords].reverse().slice(0, 5);

	const progressPercent = Math.min((todayTotal / goal) * 100, 100);

	const handleNewGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Remove qualquer caractere que não seja número
		const numericValue = value.replace(/\D/g, "");
		setNewGoal(numericValue);
	};

	const handleGoalSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const goalValue = Number.parseInt(newGoal, 10);
		if (!Number.isNaN(goalValue) && goalValue > 0) {
			updateGoal(goalValue);
			setNewGoal("");
			setGoalDialogOpen(false);
		}
	};

	const handleNewQuickAmountChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		// Remove qualquer caractere que não seja número
		const numericValue = value.replace(/\D/g, "");
		setNewQuickAmount(numericValue);
	};

	const handleAddQuickAmount = (e: React.FormEvent) => {
		e.preventDefault();
		const amount = Number.parseInt(newQuickAmount, 10);
		if (!Number.isNaN(amount) && amount > 0) {
			addQuickAmount(amount);
			setNewQuickAmount("");
		}
	};

	return (
		<>
			<div className="mb-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
				<div className="mb-4 text-center">
					<p className="mb-1 text-gray-400 text-xs sm:text-sm">Consumo hoje</p>
					<div className="flex items-baseline justify-center gap-1">
						<span className="font-bold text-4xl text-white sm:text-5xl">
							{todayTotal}
						</span>
						<span className="text-gray-400 text-lg sm:text-xl">ml</span>
					</div>
					<div className="mt-1 flex items-center justify-center gap-2">
						<p className="text-gray-500 text-xs sm:text-sm">Meta: {goal}ml</p>
						<Dialog
							onOpenChange={(open) => {
								setGoalDialogOpen(open);
								if (open) {
									setNewGoal(goal.toString());
								}
							}}
							open={goalDialogOpen}
						>
							<DialogTrigger asChild>
								<button
									className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-slate-700 hover:text-cyan-400"
									type="button"
								>
									<Settings className="h-4 w-4" />
								</button>
							</DialogTrigger>
							<DialogContent className="border-slate-700 bg-slate-800 p-4 text-white sm:p-6">
								<DialogHeader>
									<DialogTitle className="text-base sm:text-lg">
										Editar Meta Diária
									</DialogTitle>
									<DialogDescription className="text-gray-400 text-xs sm:text-sm">
										Defina sua meta diária de consumo de água em mililitros.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleGoalSubmit}>
									<div className="mb-4">
										<label
											className="mb-2 block text-gray-400 text-xs sm:text-sm"
											htmlFor="goal"
										>
											Meta (ml)
										</label>
										<Input
											className="border-slate-600 bg-slate-700 text-white [-moz-appearance:textfield] selection:bg-cyan-500 selection:text-white focus:ring-2 focus:ring-cyan-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
											id="goal"
											inputMode="numeric"
											onChange={handleNewGoalChange}
											placeholder={goal.toString()}
											type="text"
											value={newGoal}
										/>
									</div>
									<DialogFooter>
										<Button
											className="border-slate-600 bg-slate-700 text-sm text-white hover:bg-slate-600 sm:text-base"
											onClick={() => {
												setGoalDialogOpen(false);
												setNewGoal("");
											}}
											type="button"
										>
											Cancelar
										</Button>
										<Button
											className="bg-cyan-500 text-sm text-white hover:bg-cyan-600 sm:text-base"
											disabled={!newGoal || Number.parseInt(newGoal, 10) <= 0}
											type="submit"
										>
											Salvar
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<div className="h-3 overflow-hidden rounded-full bg-slate-700">
					<div
						className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-400 transition-all duration-500"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</div>

			<div className="mb-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
				<div className="mb-4 flex items-center justify-between">
					<label
						className="block text-gray-400 text-xs sm:text-sm"
						htmlFor="customAmount"
					>
						Quantidade personalizada
					</label>
					<Dialog
						onOpenChange={setQuickAmountDialogOpen}
						open={quickAmountDialogOpen}
					>
						<DialogTrigger asChild>
							<button
								className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-slate-700 hover:text-cyan-400"
								onClick={() => setNewGoal(goal.toString())}
								type="button"
							>
								<Settings className="h-4 w-4" />
							</button>
						</DialogTrigger>
						<DialogContent className="border-slate-700 bg-slate-800 p-4 text-white sm:p-6">
							<DialogHeader>
								<DialogTitle className="text-base sm:text-lg">
									Gerenciar Medidas Rápidas
								</DialogTitle>
								<DialogDescription className="text-gray-400 text-xs sm:text-sm">
									Adicione ou remova medidas rápidas para facilitar o registro.
								</DialogDescription>
							</DialogHeader>
							<form className="mb-4" onSubmit={handleAddQuickAmount}>
								<div className="mb-4">
									<label
										className="mb-2 block text-gray-400 text-xs sm:text-sm"
										htmlFor="newQuickAmount"
									>
										Nova medida (ml)
									</label>
									<div className="flex gap-2">
										<Input
											className="border-slate-600 bg-slate-700 text-white [-moz-appearance:textfield] selection:bg-cyan-500 selection:text-white focus:ring-2 focus:ring-cyan-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
											id="newQuickAmount"
											inputMode="numeric"
											onChange={handleNewQuickAmountChange}
											placeholder="Digite em ml"
											type="text"
											value={newQuickAmount}
										/>
										<Button
											className="flex-shrink-0 bg-cyan-500 text-white hover:bg-cyan-600"
											disabled={
												!newQuickAmount ||
												Number.parseInt(newQuickAmount, 10) <= 0 ||
												quickAmounts.includes(
													Number.parseInt(newQuickAmount, 10)
												)
											}
											type="submit"
										>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</form>
							<div className="mb-4">
								<p className="mb-2 text-gray-400 text-xs sm:text-sm">
									Medidas rápidas atuais:
								</p>
								<div className="flex flex-wrap gap-2">
									{quickAmounts.map((amount) => (
										<div
											className="flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-700 px-2.5 py-1.5 sm:px-3 sm:py-2"
											key={amount}
										>
											<span className="text-white text-xs sm:text-sm">
												{amount}ml
											</span>
											<button
												className="ml-1 rounded p-0.5 text-gray-400 transition-colors hover:bg-red-500/20 hover:text-red-400 sm:p-1"
												onClick={() => removeQuickAmount(amount)}
												type="button"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
							</div>
							<DialogFooter>
								<Button
									className="border-slate-600 bg-slate-700 text-sm text-white hover:bg-slate-600 sm:text-base"
									onClick={() => {
										setQuickAmountDialogOpen(false);
										setNewQuickAmount("");
									}}
									type="button"
								>
									Fechar
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				<form className="mb-4 flex gap-2" onSubmit={handleCustomSubmit}>
					<div className="relative flex-1">
						<Input
							className="h-auto w-full rounded-xl border-slate-600 bg-slate-700 px-3 py-2.5 pr-10 text-base text-white [-moz-appearance:textfield] selection:bg-cyan-500 selection:text-white focus:border-transparent focus:ring-2 focus:ring-cyan-500 sm:px-4 sm:py-3 sm:pr-12 sm:text-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							inputMode="numeric"
							onChange={handleCustomAmountChange}
							placeholder="Digite em ml"
							type="text"
							value={customAmount}
						/>
						<span className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center text-base text-gray-400 leading-none sm:right-4 sm:text-lg">
							ml
						</span>
					</div>
					<button
						className="flex-shrink-0 rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3"
						disabled={!customAmount || Number.parseInt(customAmount, 10) <= 0}
						type="submit"
					>
						<Plus className="h-5 w-5 sm:h-6 sm:w-6" />
					</button>
				</form>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{quickAmounts.map((amount) => (
						<button
							className="rounded-xl border border-slate-600 bg-slate-700 px-2 py-2.5 font-medium text-white text-xs transition-colors hover:bg-slate-600 sm:py-3 sm:text-sm"
							key={amount}
							onClick={() => handleAddWater(amount)}
							type="button"
						>
							{amount}ml
						</button>
					))}
				</div>
			</div>

			{recentRecords.length > 0 && (
				<div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-3 backdrop-blur-sm sm:p-4">
					<h2 className="mb-3 font-semibold text-sm text-white sm:text-base">
						Últimas adições
					</h2>
					<ScrollArea className="block h-[180px] w-full sm:h-[212px]">
						<div className="block w-full space-y-2">
							{recentRecords.map((record) => (
								<div
									className="flex w-full items-center justify-between rounded-xl bg-slate-700/50 p-2.5 sm:p-3"
									key={record.id}
								>
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="rounded-lg bg-cyan-500/20 p-1 sm:p-1.5">
											<Droplets className="h-3.5 w-3.5 text-cyan-400 sm:h-4 sm:w-4" />
										</div>
										<div>
											<p className="font-medium text-sm text-white sm:text-base">
												{record.amount}ml
											</p>
											<p className="text-gray-500 text-xs">
												{formatTime(record.timestamp)}
											</p>
										</div>
									</div>
									<button
										className="flex-shrink-0 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-400/10 hover:text-red-400 sm:p-2"
										onClick={() => deleteRecord(record.id)}
										type="button"
									>
										<Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									</button>
								</div>
							))}
						</div>
						<ScrollBar className="*:data-[slot=scroll-area-thumb]:bg-slate-600" />
					</ScrollArea>
				</div>
			)}
		</>
	);
}
