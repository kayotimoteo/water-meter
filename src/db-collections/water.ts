import {
	createCollection,
	localOnlyCollectionOptions,
} from "@tanstack/react-db";
import { z } from "zod";

const WaterIntakeSchema = z.object({
	id: z.number(),
	amount: z.number(),
	timestamp: z.number(),
	date: z.string(),
});

export type WaterIntake = z.infer<typeof WaterIntakeSchema>;

export const waterIntakeCollection = createCollection(
	localOnlyCollectionOptions({
		getKey: (intake) => intake.id,
		schema: WaterIntakeSchema,
	})
);
