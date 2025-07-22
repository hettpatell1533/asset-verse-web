import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const steps = [
    {
        title: "Company Details",
        description: "Detail information of company",
    },
    {
        title: "Sites",
        description: "Detail information of sites",
    },
    {
        title: "Location",
        description: "Detail information of location",
    },
];

const companySchema = z.object({
    companyName: z.string().min(1, "Comapn Name is required"),
    organizationType: z.string().min(1, "Please select organization type"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "Please select city"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    companyLogo: z.instanceof(File).optional(),
});

const sitesSchema = z.object({
    siteName: z.string().min(1, "Required"),
});

const locationSchema = z.object({
    siteName: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
});

type Step = 0 | 1 | 2;

const schemaMap = {
    0: companySchema,
    1: sitesSchema,
    2: locationSchema,
};

const defaultValuesMap = {
    0: {
        companyName: "",
        organizationType: "",
    },
    1: {
        siteName: "",
    },
    2: {
        siteName: "",
        location: "",
    },
};

type FormValuesMap = {
    0: z.infer<typeof companySchema>;
    1: z.infer<typeof sitesSchema>;
    2: z.infer<typeof locationSchema>;
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 };

export default function CompanySetup() {
    const [step, setStep] = useState(0);
    const [site, setSite] = useState("");
    const [location, setLocation] = useState("");
    const [marker, setMarker] = useState(defaultCenter);
    const [map, setMap] = useState(null);

    const currentStep = step as Step;
    const schema = schemaMap[currentStep];
    const defaults = defaultValuesMap[currentStep];

    const form = useForm<FormValuesMap[typeof currentStep]>({
        resolver: zodResolver(schema),
        defaultValues: defaults,
    });

    const onPrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const onSubmit = (data: any) => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            console.log("Final submit", data);
        }
    };

    // useEffect(() => {
    //     const loader = new window.google.maps.plugins.loader.Loader({
    //         apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    //         libraries: ["places"]
    //     });

    //     loader.load().then(() => {
    //         const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
    //             center: marker,
    //             zoom: 14
    //         });
    //         setMap(mapInstance);
    //         const input = document.getElementById("locationInput");
    //         const autocomplete = new window.google.maps.places.Autocomplete(input);
    //         autocomplete.addListener("place_changed", () => {
    //             const place = autocomplete.getPlace();
    //             if (place.geometry) {
    //                 const loc = place.geometry.location;
    //                 mapInstance.setCenter(loc);
    //                 setMarker({ lat: loc.lat(), lng: loc.lng() });
    //                 setLocation(place.formatted_address);
    //             }
    //         });

    //         const mapMarker = new window.google.maps.Marker({
    //             map: mapInstance,
    //             position: marker,
    //             draggable: true
    //         });

    //         mapMarker.addListener("dragend", () => {
    //             const pos = mapMarker.getPosition();
    //             const geocoder = new window.google.maps.Geocoder();
    //             geocoder.geocode({ location: pos }, (results, status) => {
    //                 if (status === "OK" && results[0]) {
    //                     setLocation(results[0].formatted_address);
    //                     (document.getElementById("locationInput") as HTMLInputElement).value = results[0].formatted_address;
    //                 }
    //             });
    //             setMarker({ lat: pos.lat(), lng: pos.lng() });
    //         });
    //     });
    // }, []);

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-2 shadow w-full">
                <div>
                    <img src="../../../public/assets/asm-logo.png" width={464} height={238} alt="ASM" className="w-24" />
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span>+966-515-555-788</span>
                    <span>CONTACT@ASSETMANAGEMENT.COM</span>
                    <button className="text-red-500">Logout</button>
                </div>
            </header>

            {/* Body */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-100 p-4 space-y-6">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`cursor-pointer border-l-4 px-4 py-2 ${step === i ? "bg-green-100 border-green-500" : "border-transparent"
                                }`}
                        >
                            <div className="font-semibold">{s.title}</div>
                            <div className="text-sm text-gray-500">{s.description}</div>
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-2">{steps[step].title} Details</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Please provide your company’s basic setup details to proceed. These details help us tailor services to your business <br /> needs and ensure proper account configuration.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {step === 0 && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="companyName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter your company name" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="organizationType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Organization Type</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your organization type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                                <SelectItem value="llc">LLC</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Enter your company address" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your city" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                                <SelectItem value="llc">LLC</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Saudi Arab" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="zip"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Postal Code</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter your postal code" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your country" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                                <SelectItem value="llc">LLC</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="companyLogo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Comapny Logo</FormLabel>
                                                <FormControl>
                                                    <div>
                                                        <Input
                                                            type="file"
                                                            className="!w-full !px-4 !py-3 !h-auto !border !rounded-md hidden"
                                                            id="companyLogo"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    field.onChange(file)
                                                                    // handleFileChange(e)
                                                                }
                                                            }}
                                                            name={field.name}
                                                            data-testid="profile-picture-input"
                                                            ref={field.ref}
                                                            onBlur={field.onBlur}
                                                            disabled={field.disabled}
                                                            placeholder="Upload your profile picture"
                                                        />
                                                        <Label htmlFor="companyLogo" className="w-full cursor-pointer rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 h-10 flex items-center">{form.watch("companyLogo")?.name || "Upload your file"}</Label>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            {step === 1 && (
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="siteName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Site Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter your site name" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <p className="text-xs text-red-600 mt-2">*more sites you can add it from the dashboard</p>
                                </div>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="siteName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sitename</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select sitename" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                                <SelectItem value="llc">LLC</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enteer location name" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="h-[400px] rounded-xl overflow-hidden mt-4">
                                        <div id="map" className="h-full w-full"></div>
                                    </div>
                                </>
                            )}

                            <div className="text-center flex items-center gap-4 justify-center">
                                <Button type="button" className="w-44 h-12 bg-transparent hover:bg-transparent rounded-none text-primary border-solid border-2 border-primary
" onClick={onPrev}>Back</Button>
                                <Button type="submit" className="w-44 h-12 rounded-none bg-[linear-gradient(94.29deg,_#00387D_44.05%,_#009ED0_98.82%)]
">{step === steps.length - 1 ? "Go To Dashboard" : "Next"}</Button>
                            </div>
                        </form>
                    </Form>
                </main>
            </div>

            {/* Footer */}
            <footer className="flex justify-between items-center p-4 bg-[#003C80] text-white text-sm">
                <div>© 2025 All rights reserved</div>
                <div className="flex gap-3">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fab fa-x-twitter"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-whatsapp"></i>
                </div>
                <div className="flex gap-4">
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
}
