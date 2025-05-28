"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@/components/ui";
import { FaExclamationTriangle, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ApiFunction from "@/components/api/apiFunction";
import { deactivateuser } from "@/components/api/apiEndpoints";
import { useDispatch } from "react-redux";
import { setUserData, setAccessToken, setRefreshToken } from "@/redux/slices/loginSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { setLogin } from "@/redux/slices/loginSlice";
export default function DeactivateAccountPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { put } = ApiFunction()
  const dispatch = useDispatch()

  const handleDeactivate = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const apiData = {
        password: password,
      }
      put(deactivateuser, apiData)
        .then((result) => {
          if (result?.success) {
            dispatch(setUserData(''));
            dispatch(setAccessToken(''));
            dispatch(setRefreshToken(''));
            Cookies.remove("estate_loop_token");
            localStorage.removeItem("estate_loop_token");
            dispatch(setLogin(false));
            toast.success(result?.message);
            router.push("/");
          }
        }).catch((err) => {
          handleError(err)
        }).finally(() => setIsLoading(false));
    } catch (err) {
      setError("Failed to deactivate account. Please try again.");
      console.error("Deactivation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">
          Deactivate Your Account
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We're sorry to see you go. Please confirm your decision below.
        </p>
      </div>

      <Card className="border border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-900/10">
        <CardHeader className="flex items-center gap-3 p-6 pb-0">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Before you go...
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Here's what will happen if you deactivate your account
            </p>
          </div>
        </CardHeader>
        <CardBody className="p-6 pt-4">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">•</span>
              <span>Your profile will be hidden from other users</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">•</span>
              <span>Your listings will be deactivated and hidden</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">•</span>
              <span>You won't be able to log in with this account</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">•</span>
              <span>Your saved favorites and searches will be deleted</span>
            </li>
          </ul>

          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              Need help instead?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              If you're experiencing issues or have questions, our support team
              is here to help.
            </p>
            <Button
              variant="light"
              color="primary"
              className="w-full sm:w-auto"
              onPress={() => router.push("/contact")}
            >
              Contact Support
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              color="danger"
              variant="shadow"
              className="w-full sm:w-auto"
              onPress={onOpen}
              startContent={<FaLock />}
            >
              I understand, deactivate my account
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                    <FaLock className="text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-xl font-semibold">
                    Confirm Deactivation
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  To confirm, please enter your password to deactivate your
                  account. This action cannot be undone.
                </p>

                <Input
                  autoFocus
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  type="password"
                  value={password}
                  labelPlacement="outside"
                  onChange={(e) => setPassword(e.target.value)}
                  errorMessage={error}
                  isInvalid={!!error}
                  onFocus={() => setError("")}
                  endContent={
                    <FaLock className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  className="mb-4"
                />

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Warning:</strong> This will permanently delete your
                    account and all associated data. This action cannot be
                    undone.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="flat"
                  onPress={onClose}
                  className="w-full sm:w-auto"
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={handleDeactivate}
                  isLoading={isLoading}
                  className="w-full sm:w-auto"
                  startContent={!isLoading && <FaLock />}
                >
                  Deactivate Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
