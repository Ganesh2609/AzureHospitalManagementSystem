import { HomeSidebar } from "@/pages/patients/HomeSidebar";
// import { SidebarRight } from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/aceternity/animated-modal";

import { WobbleCard } from "@/components/aceternity/WobbleCard";

import appointmentsImg from "@/assets/icons/appointments.svg";
import pendingImg from "@/assets/icons/pending.svg";
import cancelledImg from "@/assets/icons/cancelled.svg";

import { AppointmentsState } from "@/types/types";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

import {
  createAppointment,
  getRequestsByPatient,
} from "@/lib/actions/appointment.actions";
import { DataTable } from "@/pages/doctors/DocDataTable";
import { columns } from "@/pages/patients/appointmentCol";

import { cn, getProperDate } from "@/lib/utils";
import { BentoGridItem, BentoGrid } from "@/components/aceternity/bento-grid";
import {
  IconFileBroken,
  IconTableColumn,
  IconUsersGroup,
  IconManFilled,
  IconDentalBroken,
  IconEarScan,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Tabs, Tab, } from "@nextui-org/react";

const PatientHome = () => {
  const [appointments, setAppointments] = useState<AppointmentsState>({
    appointments: [],
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  });
  const [doctype, setdoctype] = useState<string>("general");

  useEffect(() => {
    const patientId = localStorage.getItem("patient_id");
    if (!patientId) return;
  
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://4.240.76.79:3000/api/appointments/patient/${patientId}`
        );
        if (!response.ok) throw new Error("Failed to fetch appointments");
  
        const data = await response.json();
        if (data.success) {
          setAppointments({
            appointments: data.appointments,
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
          });
          console.log(data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        if (err instanceof Error) {
        } else {
        }
      } finally {
      }
    };
  
    // Initial fetch call
    fetchAppointments();
  
    // Set up interval to fetch every 2 seconds
    const intervalId = setInterval(fetchAppointments, 2000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <WobbleCard
              containerClassName="col-span-1 h-full  lg:max-h-[200px]"
              className=""
            >
              <div className="flex flex-col gap-7">
                <div className="flex items-center gap-4">
                  <img
                    src={appointmentsImg}
                    style={{ height: "48px", width: "48px" }}
                    alt="appointments"
                    className="size-8 w-fit"
                  />
                  <h2 className="text-32-bold text-white">
                    {appointments.scheduledCount}
                  </h2>
                </div>
                <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
                  Scheduled appointments
                </h2>
              </div>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 bg-pink-800 lg:max-h-[200px] items-center justify-center">
              <div className="flex flex-col gap-7">
                <div className="flex items-center gap-4">
                  <img
                    src={pendingImg}
                    style={{ height: "48px", width: "48px" }} // Increased size
                    alt="appointments"
                    className="size-8 w-fit"
                  />

                  <h2 className="text-32-bold text-white">
                    {appointments.pendingCount}
                  </h2>
                </div>

                <h2 className="max-w-sm  text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
                  Pending appointments
                </h2>
              </div>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 lg:col-span-1 bg-blue-900 lg:max-h-[200px]">
              <div className="flex flex-col gap-7">
                <div className="flex items-center gap-4">
                  <img
                    src={cancelledImg}
                    style={{ height: "48px", width: "48px" }}
                    alt="appointments"
                    className="size-8 w-fit"
                  />
                  <h2 className="text-32-bold text-white">
                    {appointments.cancelledCount}
                  </h2>
                </div>
                <h2 className="max-w-sm md:max-w-lg  text-left  text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
                  Cancelled appointments
                </h2>
              </div>
            </WobbleCard>
          </div>

          <BentoGrid>
            {/* <div
                className={cn(
                  "rounded-xl hover:shadow-xl transition max-h-[350px] duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between space-y-4 min-w-[940px]  "
                )}
              >
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                  {<IconFileBroken className="h-4 w-4 text-neutral-500" />}
                  <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {"Upcoming Appionments"}
                  </div>
                  <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    <span className="text-sm"></span>
                  </div>
                </div>
                {
                  
                }
              </div> */}
            <BentoGridItem
              key={0}
              title={
                <h2 className="text-2xl text-white">Book Appionment Now</h2>
              }
              description={
                <div className="flex flex-col">
                  <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                      tabList:
                        "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                      cursor: "w-full bg-[#22d3ee]",
                      tab: "max-w-fit px-0 h-12",
                      tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                    }}
                    onSelectionChange={(key) => setdoctype(key.toString())}
                  >
                    <Tab
                      key="general"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconUsersGroup />
                          <span>General</span>
                          {/* <Chip size="sm" variant="faded">
                            9
                          </Chip> */}
                        </div>
                      }
                    />
                    <Tab
                      key="pediatric"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconManFilled />
                          <span>Pediatric</span>
                        </div>
                      }
                    />
                    <Tab
                      key="dentist"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconDentalBroken />
                          <span>Dentist</span>
                        </div>
                      }
                    />
                    <Tab
                      key="ent"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconEarScan />
                          <span>ENT Specialist</span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
              }
              header={<SkeletonTwo docType={doctype} />}
              className={cn("[&>p:text-lg]", "col-span-7")}
              // icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
            />

            <BentoGridItem
              key={1}
              title={"Upcoming Appionments"}
              description={<span className="text-sm"></span>}
              header={
                <DataTable
                  columns={columns}
                  data={appointments.appointments}
                ></DataTable>
              }
              className={cn("[&>p:text-lg]", "md:col-span-8", "max-h-[360px]")}
              icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              key={2}
              title={"Appionment Requests"}
              description={<span className="text-sm"></span>}
              header={<SkeletonFour />}
              className={cn("[&>p:text-lg]", "md:col-span-4 ", "max-h-[360px]")}
              icon={<IconTableColumn className="h-4 w-4 text-neutral-500" />}
            />
          </BentoGrid>
          <NotificationsModal userId={localStorage.getItem("userId")} />
        </div>

        <Toaster />
      </SidebarInset>
      {/* <SidebarRight /> */}
    </SidebarProvider>
  );
};

export default PatientHome;
import {
  Select,
  SelectItem,
  Avatar,
  SelectedItems,
  DatePicker,
  Button,
  Textarea,
} from "@nextui-org/react";
import { IconStethoscope, IconSearch } from "@tabler/icons-react";
import { getDoctorIcon } from "@/constants/index";
import { Doctor } from "@/types/types";

import { getDates } from "@/lib/actions/appointment.actions";

import {
  DateValue,
  parseDate,
  getLocalTimeZone,
  today,
} from "@internationalized/date";


interface Review {
  fname: string;
  lname: string;
  feedback: string;
}

interface Reviews {
  positive: Review[];
  neutral: Review[];
  negative: Review[];
}


const SkeletonTwo = ({ docType }: { docType: string }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialization, setSpecialization] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    parseDate("2024-04-04")
  );

  const [timeSlots, setTimeSlots] = useState<any[]>([]); // Array of time slots
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    time: string;
    id: string | null;
  }>({ time: "No time slot selected", id: null });
  const [specializationsData, setSpecializationsData] =
    useState<SpecializationData>({
      dentist: [],
      general: [],
      pediatric: [],
      ent: [],
    });
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState("");

  interface SpecializationEntry {
    id: string;
    label: string;
  }

  interface SpecializationData {
    [key: string]: SpecializationEntry[];
  }

  const formatSpecializationsData = (data: any[]): SpecializationData => {
    const formattedData: SpecializationData = {
      dentist: [],
      general: [],
      pediatric: [],
      ent: [],
    };

    data.forEach((item) => {
      const entry: SpecializationEntry = {
        id: item.specialization_id,
        label: item.specialization_name,
      };
      switch (item.medical_field) {
        case "Dentistry":
          formattedData.dentist.push(entry);
          break;
        case "General Practice":
          formattedData.general.push(entry);
          break;
        case "Pediatrics":
          formattedData.pediatric.push(entry);
          break;
        case "ENT":
          formattedData.ent.push(entry);
          break;
        default:
          break;
      }
    });

    return formattedData;
  };

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch(
          "http://4.240.76.79:3000/api/getSpecializations"
        );
        const data = await response.json();
        const formattedSpecializations = formatSpecializationsData(data);
        setSpecializationsData(formattedSpecializations);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };

    fetchSpecializations();
  }, []);

  const specializations = specializationsData[docType] || [];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://4.240.76.79:3000/api/doctors/active"
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching active doctors:", error);
    }
  };

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(
        (doctor) => doctor.specialization_id === selectedSpecialization
      )
    : doctors;

  const handleSpecializationChange = (value: string) => {
    console.log(value);
    setSpecialization(value);
  };

  const handleTimeSlotSelected = (timeSlot: {
    time: string;
    id: string | null;
  }) => {
    setSelectedTimeSlot(timeSlot);
    console.log(timeSlot);
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedDoctor(e.target.value);
    console.log(selectedDate);
    console.log("selectedDoctor", selectedDoctor);
    fetchAvailableSlots(e.target.value, selectedDate);
  };


  const generateTimeSlots = (availableSlots: any[]) => {
    const timeSlots = [];
    let currentTime = 10;

    for (let i = 0; i < 9; i++) {
      const formattedTime = `${currentTime}:00 ${
        currentTime < 12 ? "AM" : "PM"
      }`;
      currentTime = currentTime === 12 ? 13 : currentTime + 1;

      const availableSlot = availableSlots.find(
        (slot) => slot.start_time === `${formattedTime.split(" ")[0]}:00`
      );

      timeSlots.push({
        time: formattedTime,
        id: availableSlot ? availableSlot.slot_id : null,
        isDisabled: !availableSlot,
      });
    }

    return timeSlots;
  };

  const fetchAvailableSlots = async (doctorId: string, date: DateValue) => {
    if (!doctorId || !date) return;

    try {
      const response = await getDates({ doctor_id: doctorId, date });
      console.log("response", response);
      if (response?.slots?.length > 0) {
        setTimeSlots(generateTimeSlots(response.slots));
      } else {
      }
    } catch (error) {
    } finally {
    }
  };
  
  const handleBookAppointment = async () => {
    try {
      const appointmentData = {
        userId: localStorage.getItem("userId"),
        patient: localStorage.getItem("patient_id"),
        primaryPhysician: selectedDoctor,
        schedule: selectedDate,
        timeSlot: selectedTimeSlot.id,
        reason: selectedReason,
      };
      console.log(appointmentData);

      await createAppointment(appointmentData);
    } catch (error) {
      // Handle error, such as displaying an error message to the user
      console.error("Error creating appointment:", error);
    }
  };


  const [reviews, setReviews] = useState<Reviews>({
    positive: [],
    neutral: [],
    negative: []
  });

  const getReviews = async () => {
    try {
      const response = await fetch(`http://4.240.76.79:3000/api/review/${selectedDoctor}`);
      if (response.ok) {
        const result: Reviews = await response.json();
        console.log(result)
        setReviews(result);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    getReviews();
    const interval = setInterval(() => {
      getReviews();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal>
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"
      >
        <div className="flex w-full h-full flex-row gap-5 mt-3">
          <Select
            variant="bordered"
            label={<h2 className="text-xl mb-0.5 text-white">Specialist</h2>}
            placeholder="Select a Specialist"
            className="bg-black bg-opacity-50 mt-0"
            size="lg"
            startContent={<IconStethoscope />}
            errorMessage="Please select a Specialist"
            onChange={(e) => handleSpecializationChange(e.target.value)}
          >
            {specializations.map((specialization) => (
              <SelectItem key={specialization.id} value={specialization.id}>
                {specialization.label}
              </SelectItem>
            ))}
          </Select>

          <DatePicker
            label={<h2 className="text-lg text-white">Appointment Date</h2>}
            size="lg"
            variant="bordered"
            onChange={setSelectedDate}
            className="bg-black bg-opacity-50"
            minValue={today(getLocalTimeZone())}
          />

          <div className="relative">
            <Button
              color="success"
              endContent={<IconSearch />}
              className="group-hover/modal-btn min-w-[170px] mt-5"
            >
              <h4 className="text-18-bold text-black">Search</h4>
            </Button>

            <ModalTrigger className="absolute inset-0 max-h-[40px] mt-5 bg-transparent cursor-pointer z-10">
              <div></div>
            </ModalTrigger>
          </div>
        </div>
      </motion.div>

      <ModalBody>
        <ModalContent className="">
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold mb-8">
            Book your Appointment now!
          </h4>

          <div className="flex flex-col gap-3 ">
            <Select
              items={filteredDoctors}
              label="Assigned to"
              placeholder="Select a user"
              labelPlacement="outside"
              classNames={{
                base: "max-w-xs",
                trigger: "h-12",
              }}
              onChange={handleDoctorChange}
              renderValue={(items: SelectedItems<Doctor>) => {
                return items.map((doctor) =>
                  doctor.data ? (
                    <div
                      key={doctor.data.doctor_id}
                      className="flex items-center gap-2"
                    >
                      <Avatar
                        alt={`${doctor.data.first_name} ${doctor.data.last_name}`}
                        className="flex-shrink-0"
                        size="sm"
                        src={
                          getDoctorIcon(
                            doctor.data.first_name,
                            doctor.data.last_name
                          ) as string
                        }
                      />
                      <div className="flex flex-col">
                        <span>{`${doctor.data.first_name} ${doctor.data.last_name}`}</span>
                        <span className="text-default-500 text-tiny">
                          (
                          {"Experience: " +
                            doctor.data.years_of_experience +
                            " Years"}
                          )
                        </span>
                      </div>
                    </div>
                  ) : null
                );
              }}
            >
              {(doctor) => (
                <SelectItem
                  key={doctor.doctor_id}
                  textValue={`${doctor.first_name} ${doctor.last_name}`}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={`${doctor.first_name} ${doctor.last_name}`}
                      className="flex-shrink-0"
                      size="sm"
                      src={
                        getDoctorIcon(
                          doctor.first_name,
                          doctor.last_name
                        ) as string
                      }
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{`${doctor.first_name} ${doctor.last_name}`}</span>
                      <span className="text-tiny text-default-400">
                        {"Experience: " + doctor.years_of_experience + " Years"}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}  
            </Select>

            <AvailableTimeSlots
              timeSlots={timeSlots}
              selectedTimeSlot={selectedTimeSlot}
              onTimeSlotSelected={handleTimeSlotSelected}
            />

            <p className="text-lg md:text-1xl text-neutral-600 dark:text-neutral-400">Reviews</p>
            <ReviewBar reviews={reviews} />
            
            <Textarea
              // key={variant}
              variant={"underlined"}
              className="my-2"
              label="Reason"
              labelPlacement="outside"
              placeholder="Enter your Reason"
              onChange={(e) => setSelectedReason(e.target.value)}
            />

          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
            onClick={handleBookAppointment}
          >
            Book Now
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};


interface ReviewBarProps {
  reviews: Reviews;
}

const ReviewBar: React.FC<ReviewBarProps> = ({ reviews }) => {
  const totalReviews = reviews.positive.length + reviews.neutral.length + reviews.negative.length;

  // Calculate the percentage of each review type
  const positivePercentage = totalReviews > 0 ? (reviews.positive.length / totalReviews) * 100 : 0;
  const neutralPercentage = totalReviews > 0 ? (reviews.neutral.length / totalReviews) * 100 : 0;
  const negativePercentage = totalReviews > 0 ? (reviews.negative.length / totalReviews) * 100 : 0;

  // Ensure the total width is 100% by rounding the percentages and checking sum
  const sum = positivePercentage + neutralPercentage + negativePercentage;
  const scale = sum > 100 ? 100 / sum : 1;  // Adjust percentages to fit the 100% range if necessary

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full mt-4">
      <div className="h-full flex rounded-full">
        {/* Positive Reviews */}
        {positivePercentage > 0 && (
          <div
            className="h-full bg-green-500"
            style={{ width: `${(positivePercentage * scale)}%` }}
          ></div>
        )}

        {/* Neutral Reviews */}
        {neutralPercentage > 0 && (
          <div
            className="h-full bg-gray-300"
            style={{ width: `${(neutralPercentage * scale)}%` }}
          ></div>
        )}

        {/* Negative Reviews */}
        {negativePercentage > 0 && (
          <div
            className="h-full bg-red-500"
            style={{ width: `${(negativePercentage * scale)}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};






type Request = {
  request_id: string;
  doctor_id: string;
  patient_id: string;
  preferred_date: string;
  start_time: string;
  end_time: string;
  reason: string;
  day_of_week: string[];
  fname: string;
  lname: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
};

import { Clock, Calendar, User2, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationsModal from "@/components/notifiction";
import axios from "axios";
import AvailableTimeSlots from "@/components/AvailableTimeSlots";

const SkeletonFour = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientId, setpatientId] = useState<string | null>(null);
  const processingId: string | null = null;

  const [cancellationReason, setCancellationReason] = useState("");

  const handleAppointmentRequestCancel = async (request_id:any) => {
    try {
      const response = await fetch(
        `http://4.240.76.79:3000/api/appointmentRequests/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_id,
            cancellationReason
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel appointment");
      }

      await response.json();
      alert("Appointment request cancelled successfully!");
    } catch (err:any) {
      setError(err.message);
      console.error("Error cancelling appointment request:", err);
    }
  };
  

  // Get doctor ID from localStorage on mount
  useEffect(() => {
    const id = localStorage.getItem("patient_id");
    if (id) setpatientId(id);
  }, []);

  // Create reusable fetch function
  const fetchRequests = async (showLoading = true) => {
    if (!patientId) return;
    if (showLoading) {
      setError(null);
      setLoading(true);
    }

    try {
      const data = await getRequestsByPatient(patientId);
      if (Array.isArray(data) && data.length > 0) {
        const newData = data.slice(0, 2);
        // Only update if data has changed
        setRequests((prev) => {
          const hasChanged = newData.some(
            (req, index) => req.request_id !== prev[index]?.request_id
          );
          return hasChanged ? newData : prev;
        });
        console.log("newData", data);
      } else {
        setError("No requests found");
        setRequests([]);
      }
    } catch (err) {
      if (!showLoading) {
        // Only log error during polling
        console.error("Error fetching requests:", err);
        return;
      }

      if ((err as { response?: { status: number } }).response?.status === 404) {
        setError("No requests found");
        setRequests([]);
      } else {
        setError("Failed to fetch appointments");
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRequests(true);
  }, [patientId]);

  // Polling
  useEffect(() => {
    if (!patientId) return;

    const pollInterval = setInterval(() => {
      fetchRequests(false); // Don't show loading state during polling
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [patientId]);


  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="w-1/2">
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col items-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] bg-red-50 dark:bg-red-950/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
          <span className="i-lucide-alert-circle" /> {error}
        </p>
      </div>
    );
  }
  

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] gap-4 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] -z-10" />

        {requests.map((request) => (
          <Modal>
            <motion.div
              key={request.request_id}
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={cardVariants}
              className="w-1/2"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="h-full backdrop-blur-lg bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black  transition-colors duration-300">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="relative">
                          <div className="absolute -inset-1  bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-70" />
                          <img
                            src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
                            alt="avatar"
                            className="relative rounded-full h-12 w-12 border-2 border-white dark:border-black"
                          />
                        </div>

                        <div className="mt-4 space-y-2 w-full">
                          <div className="flex items-center justify-center gap-2">
                            <User2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              {request.fname} {request.lname}
                            </p>
                          </div>

                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {getProperDate(request.preferred_date).dateOnly}
                            </p>
                          </div>

                          <div className="flex items-center justify-center gap-2">
                            <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                              {request.reason}
                            </p>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full  bg-gradient-to-r from-pink-500 to-violet-500">
                              <Clock className="w-3 h-3 text-white" />
                              <p className="text-xs font-medium text-white">
                                {request.start_time.split(":")[0] +
                                  ":" +
                                  request.start_time.split(":")[1]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>

                    <ModalTrigger className="flex justify-center group/modal-btn">
                      <button className="bg-red-500 text-white no-underline group cursor-pointer relative shadow-2xl rounded-full text-xs font-semibold leading-6 inline-block">
                        {/* Radial gradient effect on hover */}
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        </span>
                        <div className="relative flex items-center z-10 rounded-full bg-red-500 px-4 ring-1 ring-white/10">
                          <span className="text-white font-bold">Cancel request</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M10.75 8.75L14.25 12L10.75 15.25"
                            ></path>
                          </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-white/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                      </button>
                    </ModalTrigger>

                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            <ModalBody>

              <ModalContent>
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                  Cancel appointment request
                </h4>
                <div className="px-6 py-4">
                  <label
                    htmlFor="cancellationReason"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Please provide the reason for cancellation:
                  </label>
                  <textarea
                    id="cancellationReason"
                    rows={8}
                    className="w-full border border-neutral-300 dark:border-neutral-700 rounded-md p-3 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    placeholder="Enter your reason here..."
                    onChange={(e) => setCancellationReason(e.target.value)}
                  ></textarea>
                </div>
              </ModalContent>

              <ModalFooter className="gap-6">        
                <button
                  className={`px-2 py-1 bg-red-600 text-white dark:bg-red-700 dark:text-white border border-red-700 dark:border-red-800 rounded-md text-sm w-36`}
                  onClick={() => handleAppointmentRequestCancel(request.request_id)}
                  disabled={processingId === request.request_id}
                >
                  Confirm
                </button>
              </ModalFooter>

            </ModalBody>
          </Modal>
        ))}
      </div>
    </motion.div>
  );
};
