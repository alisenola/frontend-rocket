import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { postRocket } from "apis";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { IRocket } from "interfaces/IRocket";
import { createRocketAction, updateRocketAction } from "store/features/rocket";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  onClose: () => void;
  item: IRocket;
}

const EventDialog: React.FC<Props> = ({ open, onClose, item }) => {
  const { register, formState: { errors }, handleSubmit } = useForm<IRocket>({
    defaultValues: item,
  });

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const submitRocket = (data: IRocket) => {
    postRocket(data)
      .then((res) => { 
        item.id ? dispatch(updateRocketAction({item: res.data as IRocket})) : dispatch(createRocketAction({item: res.data as IRocket}))
        
        enqueueSnackbar("successfully done", {
          variant: "success",
        });
      })
      .catch((err) => handleError(err));

    onClose();
  };

  const handleError = (err: any) => {
    if (err.response.status === 400)
      enqueueSnackbar(err.response.data.message, { variant: "error" });
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rocket Data</DialogTitle>
      <form id="rocket-form" onSubmit={handleSubmit(submitRocket)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            boxSizing: "border-box",
          }}
        >
          <Box width="100%" mt={3}>
            <TextField
              label="Rocket Name"
              margin="dense"
              fullWidth
              {...register("name", { required: true })}
            />
            {errors.name?.type === 'required' && <p style={{ color: 'red' }} role="alert">Rocket name is required</p>}
            <TextField
              label="Description"
              margin="dense"
              fullWidth
              {...register("description", { required: true })}
            />
            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Rocket description is required</p>}
            <TextField
              type="number"
              label="Height"
              margin="dense"
              fullWidth
              {...register("height", { min: 1 })}
            />
            <p style={{ color: 'red' }}>{errors.height?.message}</p>
            <TextField
              type="number"
              label="Diameter"
              margin="dense"
              fullWidth
              {...register("diameter", { min: 1 })}
            />
            <p style={{ color: 'red' }}>{errors.diameter?.message}</p>
            <TextField
              type="number"
              label="Mass"
              margin="dense"
              fullWidth
              {...register("mass", { min: 1 })}
            />
            <p style={{ color: 'red' }}>{errors.mass?.message}</p>
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="space-between"
            mt={2}
            width="100%"
            flexDirection="column"
          >
            <Box display="flex" justifyContent="flex-end">
              <Button component="label">
                {/* <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setImages((images) => {
                      let files = [];
                      if (e.target.files && e.target.files.length) {
                        for (let i = 0; i < e.target.files?.length || 0; i++)
                          files.push(e.target.files[i]);
                      }
                      return [...images, ...files];
                    })
                  }
                /> */}
              </Button>
            </Box>
          </Box>

          <Box display="flex" mt={2} width="100%" gap={3}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                display: "flex",
                flexGrow: 1,
                bgcolor: "white",
                color: "black",
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                display: "flex",
                flexGrow: 1,
                bgcolor: "lightgray",
                color: "black",
              }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EventDialog;
