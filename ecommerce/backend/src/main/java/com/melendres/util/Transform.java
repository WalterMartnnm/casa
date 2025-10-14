package com.melendres.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


public class Transform< V, K>{

    private Class<K> clazz;

    public Transform(Class<K> clazz){
        this.clazz = clazz;
    }

    public K transform (V v){
        Field[] fields;
        Map<String, Object> methodMap = new HashMap<>();
        Method[] methods;
        Object[] getArgs = {};
        Object[] setArgs = {1};
        try {
            K k = clazz.getDeclaredConstructor().newInstance();
            methods =  v.getClass().getMethods();

            for(Method method: methods) {
                String methodName = method.getName();
                if(methodName.startsWith("get")) {
                    Object object = method.invoke(v, getArgs);
                    methodMap.put(methodName, object);
                }
            }

            methods = clazz.getMethods();
            for(Method method: methods) {
                String methodName = method.getName();
                if(methodName.startsWith("set")){
                    methodName = methodName.replaceFirst("s", "g");
                    setArgs[0] =  methodMap.get(methodName);
                    method.invoke(k, setArgs);
                }
            }
            return k;
        }catch (NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException nex){
            return null;
        }
    }
}
