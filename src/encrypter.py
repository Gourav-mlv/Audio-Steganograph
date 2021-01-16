#  wave package available in native Pythonto read and write .wav base audio file
import wave
import sys
# reading .wav audio
audio = wave.open(sys.argv[2], mode='rb')
# Read frames and convert to byte array
frame_bytes = bytearray(list(audio.readframes(audio.getnframes())))

# text message saved as secret
secret = sys.argv[1]

secret = secret + int((len(frame_bytes)-(len(secret)*8*8))/8) * '#'
# Converting  text to  bit array
bits = list(
    map(int, ''.join([bin(ord(i)).lstrip('0b').rjust(8, '0') for i in secret])))

# LSB algorithm is applied on audio data from the text bit array
for i, bit in enumerate(bits):
    frame_bytes[i] = (frame_bytes[i] & 254) | bit
# receiving the modified bytes
frame_modified = bytes(frame_bytes)

# appending newly generated bytes to new .wav audio file
with wave.open("./modified/" + sys.argv[3] + 'embedded.wav', 'wb') as fd:
    fd.setparams(audio.getparams())
    fd.writeframes(frame_modified)
audio.close()
