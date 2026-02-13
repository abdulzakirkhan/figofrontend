// // import React from "react";
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   Grid,
// //   MenuItem,
// //   TextField,
// //   Typography,
// //   Switch,
// //   FormControlLabel,
// // } from "@mui/material";
// // import { Formik, Form } from "formik";
// // import * as Yup from "yup";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   useListDetailedLocationZoneQuery,
// //   useCreatePrepaidPackageTemplateMutation,
// // } from "../../../redux/ProvidersApi/providersApi";

// // const validationSchema = Yup.object({
// //   prepaidpackagetemplatename: Yup.string().required(),
// //   locationzoneid: Yup.number().required(),
// //   perioddays: Yup.number().min(1).required(),

// //   throttlingActive: Yup.boolean().required(),
// //   recurring: Yup.boolean().required(),

// //   throttlingThreshold1Perc: Yup.number().when("throttlingActive", {
// //     is: true,
// //     then: (s) => s.required(),
// //   }),
// //   throttlingThreshold1Limit: Yup.number().when("throttlingActive", {
// //     is: true,
// //     then: (s) => s.required(),
// //   }),

// //   recurringPeriodicityType: Yup.number().when("recurring", {
// //     is: true,
// //     then: (s) => s.required(),
// //   }),
// //   recurringPeriodicityFrequency: Yup.number().when("recurring", {
// //     is: true,
// //     then: (s) => s.required(),
// //   }),
// // });

// // const CreatePackageTemplate = () => {
// //   const navigate = useNavigate();
// //   const { data: zones = [] } = useListDetailedLocationZoneQuery();
// //   const [createPackage] = useCreatePrepaidPackageTemplateMutation();

// //   return (
// //     <Card sx={{ p: 4, maxWidth: 900 }}>
// //       <Typography variant="h5" fontWeight="bold" mb={3}>
// //         Create Package Template
// //       </Typography>

// //       <Formik
// //         initialValues={{
// //           prepaidpackagetemplatename: "",
// //           resellerid: 984,
// //           locationzoneid: "",
// //           perioddays: "",
// //           datagb: "",
// //           cost: "",

// //           throttlingActive: false,
// //           throttlingThreshold1Perc: "",
// //           throttlingThreshold1Limit: "",
// //           throttlingErrorAction: 0,

// //           recurring: false,
// //           nbOccurrence: "",
// //           recurringPeriodicityType: "",
// //           recurringPeriodicityFrequency: "",

// //           reportUnitsPreviousPackage: false,
// //         }}
// //         validationSchema={validationSchema}
// //         onSubmit={async (v) => {
// //           const payload = {
// //             prepaidpackagetemplatename: v.prepaidpackagetemplatename,
// //             resellerid: v.resellerid,
// //             locationzoneid: Number(v.locationzoneid),
// //             perioddays: Number(v.perioddays),
// //             throttlingActive: v.throttlingActive,
// //             recurring: v.recurring,
// //             reportUnitsPreviousPackage: v.reportUnitsPreviousPackage,
// //           };

// //           if (v.datagb) payload.databyte = v.datagb * 1024 ** 3;
// //           if (v.cost) payload.cost = Number(v.cost);

// //           if (v.throttlingActive) {
// //             payload.throttlingThreshold1Perc = Number(v.throttlingThreshold1Perc);
// //             payload.throttlingThreshold1Limit = Number(v.throttlingThreshold1Limit);
// //             payload.throttlingErrorAction = Number(v.throttlingErrorAction);
// //           }

// //           if (v.recurring) {
// //             payload.nbOccurrence = Number(v.nbOccurrence);
// //             payload.recurringPeriodicityType = Number(v.recurringPeriodicityType);
// //             payload.recurringPeriodicityFrequency = Number(v.recurringPeriodicityFrequency);
// //           }

// //           await createPackage(payload).unwrap();
// //           navigate(-1);
// //         }}
// //       >
// //         {({ values, handleChange }) => (
// //           <Form>
// //             <Grid container spacing={2}>

// //               {/* BASIC */}
// //               <Grid item xs={6}>
// //                 <TextField name="prepaidpackagetemplatename" label="Package Name" fullWidth onChange={handleChange} />
// //               </Grid>

// //               <Grid item xs={6}>
// //                 <TextField select name="locationzoneid" label="Location Zone" fullWidth onChange={handleChange}>
// //                   {zones.map((z) => (
// //                     <MenuItem key={z.zoneId} value={z.zoneId}>
// //                       {z.zoneName}
// //                     </MenuItem>
// //                   ))}
// //                 </TextField>
// //               </Grid>

// //               <Grid item xs={6}>
// //                 <TextField name="perioddays" label="Validity (Days)" type="number" fullWidth onChange={handleChange} />
// //               </Grid>

// //               <Grid item xs={6}>
// //                 <TextField name="datagb" label="Data (GB)" type="number" fullWidth onChange={handleChange} />
// //               </Grid>

// //               <Grid item xs={6}>
// //                 <TextField name="cost" label="Price" type="number" fullWidth onChange={handleChange} />
// //               </Grid>

// //               {/* THROTTLING */}
// //               <Grid item xs={12}>
// //                 <FormControlLabel
// //                   control={<Switch name="throttlingActive" checked={values.throttlingActive} onChange={handleChange} />}
// //                   label="Enable Throttling"
// //                 />
// //               </Grid>

// //               {values.throttlingActive && (
// //                 <>
// //                   <Grid item xs={6}>
// //                     <TextField name="throttlingThreshold1Perc" label="Threshold % " type="number" fullWidth onChange={handleChange} />
// //                   </Grid>
// //                   <Grid item xs={6}>
// //                     <TextField name="throttlingThreshold1Limit" label="Speed Limit" type="number" fullWidth onChange={handleChange} />
// //                   </Grid>
// //                 </>
// //               )}

// //               {/* RECURRING */}
// //               <Grid item xs={12}>
// //                 <FormControlLabel
// //                   control={<Switch name="recurring" checked={values.recurring} onChange={handleChange} />}
// //                   label="Recurring Package"
// //                 />
// //               </Grid>

// //               {values.recurring && (
// //                 <>
// //                   <Grid item xs={4}>
// //                     <TextField name="nbOccurrence" label="Occurrences" type="number" fullWidth onChange={handleChange} />
// //                   </Grid>
// //                   <Grid item xs={4}>
// //                     <TextField select name="recurringPeriodicityType" label="Type" fullWidth onChange={handleChange}>
// //                       <MenuItem value={0}>Daily</MenuItem>
// //                       <MenuItem value={1}>Weekly</MenuItem>
// //                       <MenuItem value={2}>Monthly</MenuItem>
// //                     </TextField>
// //                   </Grid>
// //                   <Grid item xs={4}>
// //                     <TextField name="recurringPeriodicityFrequency" label="Frequency" type="number" fullWidth onChange={handleChange} />
// //                   </Grid>
// //                 </>
// //               )}

// //             </Grid>

// //             <Box mt={4} display="flex" gap={2}>
// //               <Button type="submit" variant="contained">Create Package</Button>
// //               <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
// //             </Box>
// //           </Form>
// //         )}
// //       </Formik>
// //     </Card>
// //   );
// // };

// // export default CreatePackageTemplate;


// import React from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Grid,
//   MenuItem,
//   TextField,
//   Typography,
//   Switch,
//   FormControlLabel,
//   Divider,
//   Paper,
//   InputAdornment,
//   Chip,
// } from "@mui/material";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//   useListDetailedLocationZoneQuery,
//   useCreatePrepaidPackageTemplateMutation,
// } from "../../../redux/ProvidersApi/providersApi";

// const validationSchema = Yup.object({
//   prepaidpackagetemplatename: Yup.string().required(),
//   locationzoneid: Yup.number().required(),
//   perioddays: Yup.number().min(1).required(),
//   throttlingActive: Yup.boolean().required(),
//   recurring: Yup.boolean().required(),
//   throttlingThreshold1Perc: Yup.number().when("throttlingActive", {
//     is: true,
//     then: (s) => s.required(),
//   }),
//   throttlingThreshold1Limit: Yup.number().when("throttlingActive", {
//     is: true,
//     then: (s) => s.required(),
//   }),
//   recurringPeriodicityType: Yup.number().when("recurring", {
//     is: true,
//     then: (s) => s.required(),
//   }),
//   recurringPeriodicityFrequency: Yup.number().when("recurring", {
//     is: true,
//     then: (s) => s.required(),
//   }),
// });

// const CreatePackageTemplate = () => {
//   const navigate = useNavigate();
//   const { data: zones = [] } = useListDetailedLocationZoneQuery();
//   const [createPackage] = useCreatePrepaidPackageTemplateMutation();

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//     //  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       py: 6,
//       px: 2,
//     }}>
//       <Card 
//         elevation={8}
//         sx={{ 
//           p: 5, 
//           maxWidth: 1000,
//           mx: 'auto',
//           borderRadius: 4,
//           background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
//         }}
//       >
//         <Box sx={{ mb: 4, textAlign: 'center' }}>
//           <Typography 
//             variant="h4" 
//             fontWeight="bold" 
//             sx={{
//               background: 'linear-gradient(135deg, #140EB3 0%, #F53D05 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 1,
//             }}
//           >
//             Create Package Template
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Configure your prepaid package with custom settings
//           </Typography>
//         </Box>

//         <Formik
//           initialValues={{
//             prepaidpackagetemplatename: "",
//             resellerid: 984,
//             locationzoneid: "",
//             perioddays: "",
//             datagb: "",
//             cost: "",
//             throttlingActive: false,
//             throttlingThreshold1Perc: "",
//             throttlingThreshold1Limit: "",
//             throttlingErrorAction: 0,
//             recurring: false,
//             nbOccurrence: "",
//             recurringPeriodicityType: "",
//             recurringPeriodicityFrequency: "",
//             reportUnitsPreviousPackage: false,
//           }}
//           validationSchema={validationSchema}
//           onSubmit={async (v) => {
//             const payload = {
//               prepaidpackagetemplatename: v.prepaidpackagetemplatename,
//               resellerid: v.resellerid,
//               locationzoneid: Number(v.locationzoneid),
//               perioddays: Number(v.perioddays),
//               throttlingActive: v.throttlingActive,
//               recurring: v.recurring,
//               reportUnitsPreviousPackage: v.reportUnitsPreviousPackage,
//             };

//             if (v.datagb) payload.databyte = v.datagb * 1024 ** 3;
//             if (v.cost) payload.cost = Number(v.cost);

//             if (v.throttlingActive) {
//               payload.throttlingThreshold1Perc = Number(v.throttlingThreshold1Perc);
//               payload.throttlingThreshold1Limit = Number(v.throttlingThreshold1Limit);
//               payload.throttlingErrorAction = Number(v.throttlingErrorAction);
//             }

//             if (v.recurring) {
//               payload.nbOccurrence = Number(v.nbOccurrence);
//               payload.recurringPeriodicityType = Number(v.recurringPeriodicityType);
//               payload.recurringPeriodicityFrequency = Number(v.recurringPeriodicityFrequency);
//             }

//             await createPackage(payload).unwrap();
//             navigate(-1);
//           }}
//         >
//           {({ values, handleChange, errors, touched }) => (
//             <Form>
//               {/* Basic Information Section */}
//               <Paper 
//                 elevation={0} 
//                 sx={{ 
//                   p: 3, 
//                   mb: 3, 
//                   borderRadius: 3,
//                   border: '2px solid #e8eaf6',
//                   background: 'white',
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                   <Typography variant="h6" fontWeight="600" color="primary">
//                     Basic Information
//                   </Typography>
//                   <Chip 
//                     label="Required" 
//                     size="small" 
//                     color="primary" 
//                     sx={{ ml: 2 }} 
//                   />
//                 </Box>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <TextField 
//                       name="prepaidpackagetemplatename" 
//                       label="Package Name" 
//                       fullWidth 
//                       onChange={handleChange}
//                       error={touched.prepaidpackagetemplatename && Boolean(errors.prepaidpackagetemplatename)}
//                       helperText={touched.prepaidpackagetemplatename && errors.prepaidpackagetemplatename}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           '&:hover fieldset': {
//                             borderColor: '#667eea',
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TextField 
//                       select 
//                       name="locationzoneid" 
//                       label="Location Zone" 
//                       fullWidth 
//                       onChange={handleChange}
//                       value={values.locationzoneid}
//                       error={touched.locationzoneid && Boolean(errors.locationzoneid)}
//                       helperText={touched.locationzoneid && errors.locationzoneid}
//                       SelectProps={{
//                         displayEmpty: true,
//                         MenuProps: {
//                           PaperProps: {
//                             sx: { maxHeight: 300 }
//                           }
//                         }
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           '&:hover fieldset': {
//                             borderColor: '#667eea',
//                           },
//                         },
//                       }}
//                     >
//                       <MenuItem value="" disabled>
//                         <em>Select a zone</em>
//                       </MenuItem>
//                       {zones.map((z) => (
//                         <MenuItem key={z.zoneId} value={z.zoneId}>
//                           {z.zoneName}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField 
//                       name="perioddays" 
//                       label="Validity Period" 
//                       type="number" 
//                       fullWidth 
//                       onChange={handleChange}
//                       error={touched.perioddays && Boolean(errors.perioddays)}
//                       helperText={touched.perioddays && errors.perioddays}
//                       InputProps={{
//                         endAdornment: <InputAdornment position="end">days</InputAdornment>,
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           '&:hover fieldset': {
//                             borderColor: '#667eea',
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField 
//                       name="datagb" 
//                       label="Data Allowance" 
//                       type="number" 
//                       fullWidth 
//                       onChange={handleChange}
//                       InputProps={{
//                         endAdornment: <InputAdornment position="end">GB</InputAdornment>,
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           '&:hover fieldset': {
//                             borderColor: '#667eea',
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField 
//                       name="cost" 
//                       label="Package Price" 
//                       type="number" 
//                       fullWidth 
//                       onChange={handleChange}
//                       InputProps={{
//                         startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           '&:hover fieldset': {
//                             borderColor: '#667eea',
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>

//               {/* Throttling Section */}
//               <Paper 
//                 elevation={0} 
//                 sx={{ 
//                   p: 3, 
//                   mb: 3, 
//                   borderRadius: 3,
//                   border: '2px solid #e8eaf6',
//                   background: 'white',
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Switch 
//                       name="throttlingActive" 
//                       checked={values.throttlingActive} 
//                       onChange={handleChange}
//                       sx={{
//                         '& .MuiSwitch-switchBase.Mui-checked': {
//                           color: '#667eea',
//                         },
//                         '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                           backgroundColor: '#667eea',
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="600">
//                         Enable Throttling
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Limit speed after threshold is reached
//                       </Typography>
//                     </Box>
//                   }
//                 />

//                 {values.throttlingActive && (
//                   <Box sx={{ mt: 3 }}>
//                     <Divider sx={{ mb: 3 }} />
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={6}>
//                         <TextField 
//                           name="throttlingThreshold1Perc" 
//                           label="Threshold Percentage" 
//                           type="number" 
//                           fullWidth 
//                           onChange={handleChange}
//                           error={touched.throttlingThreshold1Perc && Boolean(errors.throttlingThreshold1Perc)}
//                           helperText={touched.throttlingThreshold1Perc && errors.throttlingThreshold1Perc}
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">%</InputAdornment>,
//                           }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: '#667eea',
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <TextField 
//                           name="throttlingThreshold1Limit" 
//                           label="Speed Limit" 
//                           type="number" 
//                           fullWidth 
//                           onChange={handleChange}
//                           error={touched.throttlingThreshold1Limit && Boolean(errors.throttlingThreshold1Limit)}
//                           helperText={touched.throttlingThreshold1Limit && errors.throttlingThreshold1Limit}
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">Mbps</InputAdornment>,
//                           }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: '#667eea',
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 )}
//               </Paper>

//               {/* Recurring Section */}
//               <Paper 
//                 elevation={0} 
//                 sx={{ 
//                   p: 3, 
//                   mb: 4, 
//                   borderRadius: 3,
//                   border: '2px solid #e8eaf6',
//                   background: 'white',
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Switch 
//                       name="recurring" 
//                       checked={values.recurring} 
//                       onChange={handleChange}
//                       sx={{
//                         '& .MuiSwitch-switchBase.Mui-checked': {
//                           color: '#667eea',
//                         },
//                         '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                           backgroundColor: '#667eea',
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="600">
//                         Recurring Package
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Auto-renew package at specified intervals
//                       </Typography>
//                     </Box>
//                   }
//                 />

//                 {values.recurring && (
//                   <Box sx={{ mt: 3 }}>
//                     <Divider sx={{ mb: 3 }} />
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={4}>
//                         <TextField 
//                           name="nbOccurrence" 
//                           label="Number of Occurrences" 
//                           type="number" 
//                           fullWidth 
//                           onChange={handleChange}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: '#667eea',
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <TextField 
//                           select 
//                           name="recurringPeriodicityType" 
//                           label="Periodicity Type" 
//                           fullWidth 
//                           onChange={handleChange}
//                           value={values.recurringPeriodicityType}
//                           error={touched.recurringPeriodicityType && Boolean(errors.recurringPeriodicityType)}
//                           helperText={touched.recurringPeriodicityType && errors.recurringPeriodicityType}
//                           SelectProps={{
//                             displayEmpty: true,
//                           }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: '#667eea',
//                               },
//                             },
//                           }}
//                         >
//                           <MenuItem value="" disabled>
//                             <em>Select type</em>
//                           </MenuItem>
//                           <MenuItem value={0}>Daily</MenuItem>
//                           <MenuItem value={1}>Weekly</MenuItem>
//                           <MenuItem value={2}>Monthly</MenuItem>
//                         </TextField>
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <TextField 
//                           name="recurringPeriodicityFrequency" 
//                           label="Frequency" 
//                           type="number" 
//                           fullWidth 
//                           onChange={handleChange}
//                           error={touched.recurringPeriodicityFrequency && Boolean(errors.recurringPeriodicityFrequency)}
//                           helperText={touched.recurringPeriodicityFrequency && errors.recurringPeriodicityFrequency}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: '#667eea',
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 )}
//               </Paper>

//               {/* Action Buttons */}
//               <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//                 <Button 
//                   variant="outlined" 
//                   onClick={() => navigate(-1)}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: 2,
//                     borderColor: '#667eea',
//                     color: '#667eea',
//                     '&:hover': {
//                       borderColor: '#764ba2',
//                       background: 'rgba(102, 126, 234, 0.05)',
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   variant="contained"
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg,  #140EB3 0%, #F53D05 )',
//                     boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
//                     '&:hover': {
//                       background: 'linear-gradient(135deg,  #140EB3 0%, #F53D05 )',
//                       boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
//                       cursor: 'pointer',
//                     },
//                   }}
//                 >
//                   Create Package
//                 </Button>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </Card>
//     </Box>
//   );
// };

// export default CreatePackageTemplate;





import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  InputAdornment,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useListDetailedLocationZoneQuery,
  useCreatePrepaidPackageTemplateMutation,
} from "../../../redux/ProvidersApi/providersApi";

import { useLocation } from "react-router-dom";
import {
  useModifyPrepaidPackageTemplateCoreMutation,
} from "../../../redux/ProvidersApi/providersApi";


/* =======================
   VALIDATION (PROPER)
======================= */
const validationSchema = Yup.object({
  prepaidpackagetemplatename: Yup.string()
    .trim()
    .required("Package name is required"),

  locationzoneid: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("Location zone is required")
    .required("Location zone is required"),

  perioddays: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("Validity is required")
    .min(1, "Minimum 1 day")
    .required("Validity is required"),

  throttlingActive: Yup.boolean().required(),
  recurring: Yup.boolean().required(),

 throttlingThreshold1Perc: Yup.number().when("throttlingActive", {
  is: true,
  then: (schema) =>
    schema
      .typeError("Threshold % is required")
      .min(1, "Min 1%")
      .max(100, "Max 100%")
      .required("Threshold % required"),
  otherwise: (schema) => schema.notRequired(),
}),

throttlingThreshold1Limit: Yup.number().when("throttlingActive", {
  is: true,
  then: (schema) =>
    schema
      .typeError("Speed limit is required")
      .min(1, "Invalid speed")
      .required("Speed limit required"),
  otherwise: (schema) => schema.notRequired(),
}),

recurringPeriodicityType: Yup.number().when("recurring", {
  is: true,
  then: (schema) =>
    schema
      .typeError("Periodicity type required")
      .required("Periodicity type required"),
  otherwise: (schema) => schema.notRequired(),
}),


 recurringPeriodicityFrequency: Yup.number().when("recurring", {
  is: true,
  then: (schema) =>
    schema
      .typeError("Frequency required")
      .min(1, "Invalid frequency")
      .required("Frequency required"),
  otherwise: (schema) => schema.notRequired(),
}),

});


/* =======================
   COMPONENT
======================= */
const CreatePackageTemplate = () => {
  const navigate = useNavigate();
  const { data: zones = [] } = useListDetailedLocationZoneQuery();
  const [createPackage] = useCreatePrepaidPackageTemplateMutation();
 const location = useLocation();
const editData = location.state || null;
const isEdit = Boolean(editData);


const [updatePackage] =
  useModifyPrepaidPackageTemplateCoreMutation();


  return (
    <Box sx={{ minHeight: "100vh", py: 6, px: 2 }}>
      <Card
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
        }}
      >
        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(135deg, #140EB3 0%, #F53D05 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
         {isEdit ? "Edit Package Template" : "Create Package Template"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure your prepaid package with full control
          </Typography>
        </Box>

        <Formik
          initialValues={{
      prepaidpackagetemplatename: editData?.prepaidpackagetemplatename || "",
            resellerid: 984,
           locationzoneid: editData?.locationzoneid || "",
         perioddays: editData?.perioddays || "",
           datagb: editData?.databyte
    ? editData.databyte / 1024 ** 3
    : "",
  cost: editData?.cost || "",
            throttlingActive: false,
            throttlingThreshold1Perc: "",
            throttlingThreshold1Limit: "",
            throttlingErrorAction: 0,
            recurring: false,
            nbOccurrence: "",
            recurringPeriodicityType: "",
            recurringPeriodicityFrequency: "",
            reportUnitsPreviousPackage: false,
          }}
          validationSchema={validationSchema}
        //   onSubmit={async (v) => {
        //     const payload = {
        //       prepaidpackagetemplatename: v.prepaidpackagetemplatename,
        //       resellerid: v.resellerid,
        //       locationzoneid: Number(v.locationzoneid),
        //       perioddays: Number(v.perioddays),
        //       throttlingActive: v.throttlingActive,
        //       recurring: v.recurring,
        //       reportUnitsPreviousPackage: v.reportUnitsPreviousPackage,
        //     };

        //     if (v.datagb) payload.databyte = Number(v.datagb) * 1024 ** 3;
        //     if (v.cost) payload.cost = Number(v.cost);

        //     if (v.throttlingActive) {
        //       payload.throttlingThreshold1Perc = Number(v.throttlingThreshold1Perc);
        //       payload.throttlingThreshold1Limit = Number(v.throttlingThreshold1Limit);
        //       payload.throttlingErrorAction = 0;
        //     }

        //     if (v.recurring) {
        //       payload.nbOccurrence = Number(v.nbOccurrence);
        //       payload.recurringPeriodicityType = Number(v.recurringPeriodicityType);
        //       payload.recurringPeriodicityFrequency = Number(v.recurringPeriodicityFrequency);
        //     }

        //     await createPackage(payload).unwrap();
        //     navigate(-1);
        //   }}
        onSubmit={async (v) => {
  // ----------------------------
  // COMMON CORE PAYLOAD
  // ----------------------------
  const payload = {
    prepaidpackagetemplatename: v.prepaidpackagetemplatename,
    locationzoneid: Number(v.locationzoneid),
    perioddays: Number(v.perioddays),
  };

  if (v.datagb) {
    payload.databyte = Number(v.datagb) * 1024 ** 3;
  }

  if (v.cost !== "" && v.cost !== null) {
    payload.cost = Number(v.cost);
  }

  try {
    if (isEdit) {
      // ==========================
      // EDIT → 4.7 modifyPPTCore
      // ==========================
      await updatePackage({
        prepaidpackagetemplateid: editData.prepaidpackagetemplateid,
        ...payload,
      }).unwrap();
    } else {
      // ==========================
      // CREATE → createPrepaidPackageTemplate
      // ==========================
      await createPackage({
        resellerid: 984,
        throttlingActive: false,
        recurring: false,
        reportUnitsPreviousPackage: false,
        ...payload,
      }).unwrap();
    }

    navigate(-1);
  } catch (err) {
    console.error("PACKAGE SUBMIT ERROR:", err);
  }
}}

        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>

              {/* ================= BASIC INFO ================= */}
              <Paper sx={sectionStyle}>
                <SectionTitle title="Basic Information" />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="prepaidpackagetemplatename"
                      label="Package Name"
                      fullWidth
                      value={values.prepaidpackagetemplatename}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.prepaidpackagetemplatename && Boolean(errors.prepaidpackagetemplatename)}
                      helperText={touched.prepaidpackagetemplatename && errors.prepaidpackagetemplatename}
                    />
                  </Grid>

                  {/* ✅ FIXED DROPDOWN */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={touched.locationzoneid && Boolean(errors.locationzoneid)}
                    >
                      <InputLabel shrink>Location Zone</InputLabel>
                      <Select
                        name="locationzoneid"
                        value={values.locationzoneid || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        displayEmpty
                        label="Location Zone"
                        sx={{ height: 56 }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select location zone</em>
                        </MenuItem>
                        {zones.map((z) => (
                          <MenuItem key={z.zoneId} value={z.zoneId}>
                            {z.zoneName}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.locationzoneid && errors.locationzoneid && (
                        <Typography variant="caption" color="error">
                          {errors.locationzoneid}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="perioddays"
                      label="Validity"
                      type="number"
                      fullWidth
                      value={values.perioddays}
                      onChange={handleChange}
                      error={touched.perioddays && Boolean(errors.perioddays)}
                      helperText={touched.perioddays && errors.perioddays}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">days</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="datagb"
                      label="Data"
                      type="number"
                      fullWidth
                      value={values.datagb}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">GB</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="cost"
                      label="Price"
                      type="number"
                      fullWidth
                      value={values.cost}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* ================= THROTTLING ================= */}
              <Paper sx={sectionStyle}>
                <SwitchBlock
                  label="Enable Throttling"
                  description="Limit speed after usage threshold"
                  name="throttlingActive"
                  checked={values.throttlingActive}
                  onChange={handleChange}
                />

                {values.throttlingActive && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="throttlingThreshold1Perc"
                          label="Threshold"
                          type="number"
                          fullWidth
                          onChange={handleChange}
                          error={touched.throttlingThreshold1Perc && Boolean(errors.throttlingThreshold1Perc)}
                          helperText={touched.throttlingThreshold1Perc && errors.throttlingThreshold1Perc}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="throttlingThreshold1Limit"
                          label="Speed Limit"
                          type="number"
                          fullWidth
                          onChange={handleChange}
                          error={touched.throttlingThreshold1Limit && Boolean(errors.throttlingThreshold1Limit)}
                          helperText={touched.throttlingThreshold1Limit && errors.throttlingThreshold1Limit}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Mbps</InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Paper>

              {/* ================= RECURRING ================= */}
              <Paper sx={sectionStyle}>
                <SwitchBlock
                  label="Recurring Package"
                  description="Auto renew package"
                  name="recurring"
                  checked={values.recurring}
                  onChange={handleChange}
                />

                {values.recurring && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          name="nbOccurrence"
                          label="Occurrences"
                          type="number"
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel shrink>Periodicity</InputLabel>
                          <Select
                            name="recurringPeriodicityType"
                            value={values.recurringPeriodicityType || ""}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ height: 56 }}
                          >
                            <MenuItem value="" disabled>
                              <em>Select type</em>
                            </MenuItem>
                            <MenuItem value={0}>Daily</MenuItem>
                            <MenuItem value={1}>Weekly</MenuItem>
                            <MenuItem value={2}>Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          name="recurringPeriodicityFrequency"
                          label="Frequency"
                          type="number"
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Paper>

              {/* ACTIONS */}
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #140EB3, #F53D05)",
                  }}
                >
                  {isEdit ? "Update Package" : "Create Package"}
                </Button>
              </Box>

            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

/* =======================
   SMALL HELPERS
======================= */
const sectionStyle = {
  p: 3,
  mb: 3,
  borderRadius: 3,
  border: "2px solid #e8eaf6",
  background: "white",
};

const SectionTitle = ({ title }) => (
  <Box display="flex" alignItems="center" mb={3}>
    <Typography variant="h6" fontWeight={600}>
      {title}
    </Typography>
    <Chip label="Required" size="small" color="primary" sx={{ ml: 2 }} />
  </Box>
);

const SwitchBlock = ({ label, description, ...props }) => (
  <FormControlLabel
    control={<Switch {...props} />}
    label={
      <Box>
        <Typography fontWeight={600}>{label}</Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    }
  />
);

export default CreatePackageTemplate;
