package com.melendres.serviceimpl;
import com.melendres.entity.OrderItemData;
import com.melendres.enums.OrderItemStatus;
import com.melendres.model.OrderItem;
import com.melendres.repository.OrderItemDataRepository;
import com.melendres.service.OrderItemService;
import com.melendres.util.Transform;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    OrderItemDataRepository orderItemDataRepository;

    Transform<OrderItemData, OrderItem> transformOrderItemData = new Transform<>(OrderItem.class);
    Transform<OrderItem, OrderItemData> transformOrderItem = new Transform<>(OrderItemData.class);

    //@Override
    public List<OrderItem> getAll() {

        List<OrderItemData> orderItemDataRecords = new ArrayList<>();
        List<OrderItem> orderItems =  new ArrayList<>();

        orderItemDataRepository.findAll().forEach(orderItemDataRecords::add);
        Iterator<OrderItemData> it = orderItemDataRecords.iterator();
        OrderItem orderItem;

        while(it.hasNext()) {
            OrderItemData orderItemData = it.next();

            orderItem = transformOrderItemData.transform(orderItemData);

            orderItems.add(orderItem);
        }
        return orderItems;
    }

    @Override
    public List<OrderItem> getOrderItems(Integer customerId) {
        List<OrderItemData> orderItemDataRecords = new ArrayList<>();
        List<OrderItem> orderItems =  new ArrayList<>();

        orderItemDataRepository.findAllByCustomerId(customerId).forEach(orderItemDataRecords::add);
        Iterator<OrderItemData> it = orderItemDataRecords.iterator();
        OrderItem orderItem;

        while(it.hasNext()) {
            OrderItemData orderItemData = it.next();
            if(orderItemData.getStatus() == OrderItemStatus.Ordered) {
                orderItem = transformOrderItemData.transform(orderItemData);
                orderItems.add(orderItem);
            }
        }
        return orderItems;
    }


    //@Override
    public List<OrderItem> getCartItems(Integer customerId) {

        List<OrderItemData> orderItemDataRecords = new ArrayList<>();
        List<OrderItem> orderItems =  new ArrayList<>();

        orderItemDataRepository.findAllByCustomerId(customerId).forEach(orderItemDataRecords::add);
        Iterator<OrderItemData> it = orderItemDataRecords.iterator();
        OrderItem orderItem;

        while(it.hasNext()) {
            OrderItemData orderItemData = it.next();
            if(orderItemData.getStatus() == OrderItemStatus.Created) {
                orderItem = transformOrderItemData.transform(orderItemData);
                orderItems.add(orderItem);
            }
        }
        return orderItems;    
    }

    @Override
    public OrderItem create(OrderItem orderItem) {
        log.info(" add:Input {}", orderItem.toString());

        OrderItemData orderItemData = transformOrderItem.transform(orderItem);
        OrderItemData updatedOrderItemData = orderItemDataRepository.save(orderItemData);
        log.info(" add:Input {}", updatedOrderItemData.toString());

        return transformOrderItemData.transform(updatedOrderItemData);
    }

    @Override
    public List <OrderItem> create(List<OrderItem> orderItems) {
        List <OrderItem> retOrderItems = new ArrayList<>();
        for (OrderItem orderItem: orderItems){
            OrderItemData orderItemDatun = transformOrderItem.transform(orderItem);
            OrderItemData orderItemDatum = orderItemDataRepository.save(orderItemDatun);
            OrderItem newOrderItem = transformOrderItemData.transform(orderItemDatum );
            retOrderItems.add(newOrderItem);
        }
        return retOrderItems;
    }

    @Override
    public OrderItem update(OrderItem orderItem) {
        log.info("OrderItem:update:Input {}", orderItem.toString());

        int id = orderItem.getId();
        Optional<OrderItemData> optional  = orderItemDataRepository.findById(orderItem.getId());
        if(optional.isPresent()) {
            OrderItemData orderItemData = transformOrderItem.transform(orderItem);
            OrderItemData createdOrderItemData = orderItemDataRepository.save(orderItemData);
            log.info(" update:Output {}", orderItemData.toString());
            return transformOrderItemData.transform(createdOrderItemData);
        }
        else {
            log.error("OrderItem record with id: " + Integer.toString(id) + " do not exist ");
        }
        return null;
    }

    @Override
    public List<OrderItem> update(List<OrderItem> orderItems) {
        List <OrderItem> retOrderItems = new ArrayList<>();
        for (OrderItem orderItem: orderItems){
            OrderItemData orderItemDatun = transformOrderItem.transform(orderItem);
            OrderItemData orderItemDatum = orderItemDataRepository.save(orderItemDatun);
            OrderItem newOrderItem = transformOrderItemData.transform(orderItemDatum );
            retOrderItems.add(newOrderItem);
        }
        return retOrderItems;
    }

    @Override
    public List<OrderItem> updateStatus(List<Integer> ids, OrderItemStatus orderItemStatus) {
        List<OrderItemData> orderItemDats = new ArrayList<>();
        List<OrderItem> updatedOrderItems = new ArrayList<>();
        for(Integer id : ids  ) {
            Optional<OrderItemData> optional = orderItemDataRepository.findById(id);
            if (optional.isPresent()) {
                OrderItemData orderItemDatum = optional.get();
                orderItemDatum.setStatus(orderItemStatus);
                orderItemDatum = orderItemDataRepository.save(orderItemDatum);
                OrderItem updatedOrderItem = transformOrderItemData.transform(orderItemDatum);
                updatedOrderItems.add(updatedOrderItem);
            }
        }
        return updatedOrderItems;
    }

    @Override
    public OrderItem get(Integer id){
    log.info(" Input id >> "+  Integer.toString(id) );
        Optional<OrderItemData> optional = orderItemDataRepository.findById(id);
        if(optional.isPresent()) {
            log.info(" Is present >> ");
            OrderItemData orderItemDatum = optional.get();
            return  transformOrderItemData.transform(orderItemDatum);
        }
        log.info(" Failed >> unable to locate id: " +  Integer.toString(id)  );
        return null;
    }

    @Override
    public void delete (Integer id){
        Optional<OrderItemData> optional = orderItemDataRepository.findById(id);
        if( optional.isPresent()) {
            OrderItemData orderItemDatum = optional.get();
            orderItemDataRepository.delete(orderItemDatum);
            log.info(" Success >> " + orderItemDatum.toString());
        }
        else {
            log.info(" Failed >> unable to locate orderItem id: {}",id);
        }
    }
}
