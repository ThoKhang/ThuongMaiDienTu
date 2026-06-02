import { useMutation } from "@tanstack/react-query";
import { theoDoiClickService } from "../services/theoDoiClickService";

export const useTheoDoiClick = () => {
    return useMutation({
        mutationFn: theoDoiClickService.createClick
    });
};