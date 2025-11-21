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
        variant={"outline"}
        className={
          "w-full h-10 bg-gradient-to-r from-[#2dd4bf]  to-[#1f2937] animate-gradient hover:opacity-95 transition-opacity text-white hover:text-gray-50 cursor-pointer"
        }
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}>
        {scanReceiptLoading ? (
          <div className="flex items-center justify-center">
            {""}
            <Loader2 className="mr-2 animate-spin" />
            <span>Scannig Receipt...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
