"use client";

import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const fileInputRef = useRef();

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptfn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptfn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <Button
        type="button"
        className="w-full h-11 cursor-pointer btn-shimmer gap-2 text-sm font-semibold rounded-xl border-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all duration-300"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}>
        {scanReceiptLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Scanning Receipt with AI...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Camera className="mr-2 h-4 w-4" />
            <span>Scan Receipt with AI</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
