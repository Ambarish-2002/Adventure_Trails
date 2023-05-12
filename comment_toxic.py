import numpy as np
import tensorflow as tf
import pickle
from tensorflow.keras.layers import TextVectorization

#loading te mdel and the the saves vectorweights

model = tf.keras.models.load_model('toxicity.h5')
from_disk = pickle.load(open("tv_layer.pkl", "rb"))
new_v = TextVectorization.from_config(from_disk['config'])
# You have to call `adapt` with some dummy data (BUG in Keras)
new_v.adapt(tf.data.Dataset.from_tensor_slices(["xyz"]))
new_v.set_weights(from_disk['weights'])

file_path = 'review.txt'  # Replace with the path to your input text file

with open(file_path, 'r') as file:
    string_variable = file.read()

input_str = new_v(string_variable)
res = model.predict(np.expand_dims(input_str,0))
ans ='flase'
for i in res[0]:
    if i > 0.5:
        ans = 'true'

with open(file_path, 'w') as file:
    file.write(ans)