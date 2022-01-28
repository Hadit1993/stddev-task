import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomModal from './bottom-modal.components';

type InputProps = TextInputProps & {
  iconName?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  dropDown?: {
    options: string[];
    selected?: string;
    onSelect: (value: string) => void;
  };
};

const Input = (props: InputProps) => {
  const bottomModal = useRef<BottomModal>(null);

  return (
    <View style={[props.containerStyle, styles.container]}>
      <View
        style={[styles.inputContainer, !!props.error && styles.containerError]}>
        {props.dropDown ? (
          <TouchableWithoutFeedback
            onPress={() => {
              if (props.dropDown) {
                bottomModal.current?.openModal();
              }
            }}>
            <Text style={styles.dropDownText}>{props.dropDown.selected}</Text>
          </TouchableWithoutFeedback>
        ) : (
          <TextInput {...props} style={[props.style, styles.input]} />
        )}
        {!props.dropDown && !!props.iconName && (
          <Icon
            name={props.iconName}
            color={props.error ? 'red' : 'gray'}
            size={24}
          />
        )}
      </View>

      {props.error && <Text style={styles.errorMessage}>{props.error}</Text>}
      {props.dropDown && props.dropDown.options && (
        <BottomModal ref={bottomModal}>
          <View style={styles.bottomModal}>
            <Text style={styles.bottomSheetTitle}>Categories</Text>
            {props.dropDown.options.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  props.dropDown?.onSelect && props.dropDown?.onSelect(item);
                  bottomModal.current?.handleDismiss();
                }}
                key={item}>
                <View
                  style={[
                    styles.item,
                    index !== props.dropDown!.options.length - 1 &&
                      styles.bottomBorder,
                  ]}>
                  <Text style={styles.dropDownTitle}>{item}</Text>
                  {item === props.dropDown?.selected && (
                    <Icon name="done" color="green" size={24} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </BottomModal>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },

  inputContainer: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    height: '100%',
    flex: 1,
    marginRight: 10,
  },

  containerError: {
    borderColor: 'red',
  },
  errorMessage: {
    marginTop: 2,
    color: 'red',
    width: '100%',
    marginLeft: 15,
    fontSize: 11,
  },
  dropDownText: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  bottomModal: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  dropDownTitle: {flex: 1},
  bottomBorder: {
    borderBottomWidth: 0.25,
    borderBottomColor: 'grey',
  },
  bottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
});
